import BaseRoute from "../_interface";
import { ReceiptImagesPayloadSchemas } from "@payload";
import { ReceiptImagePayloads } from "@share/payloads";
import { PutReceiptImagesUsecase } from "@usecase/receiptImages/putReceiptImages";
import { awsS3 } from "@lib/clients";
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
                const formData = await context.req.formData()
                const receiptId = formData.get('receiptId') as string
                const images = formData.getAll('images') as File[]

                const request = new ReceiptImagesPayloadSchemas.POST.Request({
                    body: { 
                        receiptId: Number(receiptId),
                        images
                    }
                });

                await new PutReceiptImagesUsecase(
                    { awsS3 },
                    { receiptImage: receiptImageRepository }
                ).execute(request)

                return context.body(null, 201)
            },
            new ReceiptImagesPayloadSchemas.POST.Request()
        )
    }
}