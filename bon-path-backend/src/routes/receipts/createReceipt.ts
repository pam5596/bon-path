import BaseRoute from "../_interface";
import { ReceiptsPayloadSchemas } from "@payload";
import { getCookie } from "hono/cookie";
import { CreateReceiptUseCase } from "@usecase/receipts/createReceipt";
import { honoJwtLogin } from "@lib/clients";
import { receiptRepository } from "@lib/repositories";

export class CreateReceiptRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'post',
                path: '/receipts',
                tags: ['レシート情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 201
            },
            async (context) => {
                const loginSessionId = getCookie(context, 'loginSessionid') as string;
                const body = await context.req.json()

                const request = new ReceiptsPayloadSchemas.POST.Request({
                    cookies: { loginSessionId }, 
                    body
                })
                const response = await new CreateReceiptUseCase(
                    { honoJwt: honoJwtLogin },
                    { receipt: receiptRepository },
                ).execute(request)

                return context.json(response.getBody)
            },
            new ReceiptsPayloadSchemas.POST.Request(),
            new ReceiptsPayloadSchemas.POST.Response()
        )
    }
}