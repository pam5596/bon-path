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
        public request: ReceiptImagesPayloadSchemas.DELETE.Request
    ){}

    async execute() {
        await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        )
        const params = this.request.toValueObjectParams()

        const receiptImage = await this.repositories.receiptImage.selectById(params.id)
        if (!receiptImage) throw new UseCaseError(
            404,
            ERROR_MESSAGES.usecase.receiptImageNotFound.detail,
            ERROR_MESSAGES.usecase.receiptImageNotFound.issues,
            this.constructor.name,
            this.request.getParams
        )

        await this.repositories.receiptImage.deleteById(params.id)
    }
}