import BaseUseCase from "@usecase/_interface";
import { ReceiptImagePayloads } from "@share/payloads";
import { ReceiptImagesPayloadSchemas } from "@payload";
import { HonoJwtClient, AwsS3Client } from "@client";
import { ReceiptImageRepository } from "@repository";
import { UseCaseError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

export class DeleteReceiptImageUseCase implements BaseUseCase<
    ReceiptImagePayloads.DELETE.Request
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient, awsS3: AwsS3Client },
        public repositories: { receiptImage: ReceiptImageRepository },
    ){}

    async execute(request: ReceiptImagesPayloadSchemas.DELETE.Request) {
        await this.clients.honoJwt.verify(
            request.getCookies.loginSessionId
        )
        const params = request.toValueObjectParams()

        const receiptImage = await this.repositories.receiptImage.selectById(params.id)
        if (!receiptImage) throw new UseCaseError(
            404,
            ERROR_MESSAGES.usecase.receiptImageNotFound.detail,
            ERROR_MESSAGES.usecase.receiptImageNotFound.issues,
            this.constructor.name,
            request.getParams
        )

        await this.repositories.receiptImage.deleteById(params.id)
    }
}