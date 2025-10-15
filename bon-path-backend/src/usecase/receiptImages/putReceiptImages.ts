import BaseUseCase from "@usecase/_interface";
import { ReceiptImagePayloads } from "@share/payloads";
import { ReceiptImagesPayloadSchemas } from "@payload";
import { HonoJwtClient, AwsS3Client } from "@client";
import { ReceiptImageRepository } from "@repository";
import { ReceiptImageEntity } from "@models/entity";

export class PutReceiptImagesUsecase implements BaseUseCase<
    ReceiptImagePayloads.POST.Request
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient, awsS3: AwsS3Client },
        public repositories: { receiptImage: ReceiptImageRepository },
    ){}

    async execute(request: ReceiptImagesPayloadSchemas.POST.Request) {
        await this.clients.honoJwt.verify(
            request.getCookies.loginSessionId
        )

        const { images, receiptId } = request.toValueObjectBody();

        const receiptImages = await Promise.all(
            images.map(
                async (image) => {
                    const buffer = Buffer.from(await image.arrayBuffer())
                    await this.clients.awsS3.putObject(
                        buffer,
                        `/receipts/${image.name}`
                    )
                    return ReceiptImageEntity.fromPrimitives({
                        receiptId: receiptId.value,
                        url: `/receipts/${image.name}`
                    })
                }
            )
        )

        try {
            await this.repositories.receiptImage.insertMany(receiptImages)
        } catch(e) {
            await Promise.all(
                images.map(
                    async (image) => {
                        await this.clients.awsS3.deleteObject(`/receipts/${image.name}`)
                    }
                )
            )
            throw e
        }
    }
}