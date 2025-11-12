import BaseUseCase from "@usecase/_interface";
import { ReceiptImagePayloads } from "@share/payloads";
import { ReceiptImagesPayloadSchemas } from "@payload";
import { AwsS3Client } from "@client";
import { ReceiptImageRepository } from "@repository";
import { ReceiptImageEntity } from "@models/entity";

export class PutReceiptImagesUsecase implements BaseUseCase<
    ReceiptImagePayloads.POST.Request
> {
    constructor(
        public clients: { awsS3: AwsS3Client },
        public repositories: { receiptImage: ReceiptImageRepository },
    ){}

    async execute(request: ReceiptImagesPayloadSchemas.POST.Request) {
        const { images, receiptId } = request.toValueObjectBody();

        await Promise.all(
            images.map(
                async (image) => {
                    const buffer = Buffer.from(await image.arrayBuffer())
                    const fileKey = `receipts/${Date.now()}-${image.name}`

                    await this.clients.awsS3.putObject(
                        buffer,
                        fileKey
                    )
                    
                    const receiptImage = ReceiptImageEntity.fromPrimitives({
                        receiptId: receiptId.value,
                        url: `/${fileKey}`
                    })

                    try {
                        await this.repositories.receiptImage.insert(receiptImage)
                    } catch(e) {
                        await this.clients.awsS3.deleteObject(fileKey)
                        throw e
                    }
                }
            )
        )
    }
}