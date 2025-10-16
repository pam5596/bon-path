import BaseRoute from "../_interface";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { ReceiptImagesPayloadSchemas } from "@payload";
import { DeleteReceiptImageUseCase } from "@usecase/receiptImages/deleteReceiptImage";
import { awsS3 } from "@lib/clients";
import { receiptImageRepository } from "@lib/repositories";

export class DeleteReceiptImageRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'delete',
                path: '/receipt-images/:id',
                tags: ['レシート画像をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 204
            },
            async (context) => {
                const { id } = context.req.param()
                if (isNaN(Number(id))) throw this.createError(
                    ERROR_MESSAGES.route.invalidParams,
                    context.req.param()
                )

                const request = new ReceiptImagesPayloadSchemas.DELETE.Request({
                    params: { id: Number(id)}
                })

                await new DeleteReceiptImageUseCase(
                    { awsS3 },
                    { receiptImage: receiptImageRepository }
                ).execute(request)
            },
            new ReceiptImagesPayloadSchemas.DELETE.Request()
        )
    }
}