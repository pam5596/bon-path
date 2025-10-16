import BaseRoute from "../_interface";
import { ReceiptImagesPayloadSchemas } from "@payload";
import { ReceiptImagePayloads } from "@share/payloads";
import { PutReceiptImagesUsecase } from "@usecase/receiptImages/putReceiptImages";
import { awsS3, honoJwtLogin } from "@lib/clients";
import { receiptImageRepository } from "@lib/repositories";

export class PutReceiptImagesRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'post',
                path: '/receipt-images',
                tags: ['レシート画像をリソースとするルート'],
                requestMediaType: 'multipart/form-data',
                successStatusCode: 201
            },
            async (context) => {
                const body = await context.req.parseBody() as unknown as ReceiptImagePayloads.POST.Request['body']

                const request = new ReceiptImagesPayloadSchemas.POST.Request({
                    body
                });

                await new PutReceiptImagesUsecase(
                    { honoJwt: honoJwtLogin, awsS3 },
                    { receiptImage: receiptImageRepository }
                ).execute(request)
            },
            new ReceiptImagesPayloadSchemas.POST.Request()
        )
    }
}