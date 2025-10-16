import BaseUseCase from "@usecase/_interface";
import { ReceiptImagePayloads } from "@share/payloads";
import { ReceiptImagesPayloadSchemas } from "@payload";
import { AwsS3Client } from "@client";
import { ReceiptImageRepository } from "@repository";
import { UseCaseError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

export class DeleteReceiptImageUseCase implements BaseUseCase<
    ReceiptImagePayloads.DELETE.Request
> {
    constructor(
        public clients: { awsS3: AwsS3Client },
        public repositories: { receiptImage: ReceiptImageRepository },
    ){}

    async execute(request: ReceiptImagesPayloadSchemas.DELETE.Request) {
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