import BaseRoute from "../_interface";
import { ReceiptsPayloadSchemas } from "@payload";
import { getCookie } from "hono/cookie";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { GetReceiptUseCase } from "@usecase/receipts/getReceipt";
import { honoJwtLogin } from "@lib/clients";
import { receiptRepository } from "@lib/repositories";

export class GetReceiptRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/receipts/:id',
                tags: ['レシート情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async(context) => {
                const loginSessionId = getCookie(context, 'loginSessionId') as string;

                const { id } = context.req.param()
                if (isNaN(Number(id))) throw this.createError(
                    ERROR_MESSAGES.route.invalidParams,
                    context.req.param()
                )
                
                const request = new ReceiptsPayloadSchemas.GET.Request({
                    cookies: { loginSessionId },
                    params: { id: Number(id) }
                })

                const response = await new GetReceiptUseCase(
                    { honoJwt: honoJwtLogin },
                    { receipt: receiptRepository },
                ).execute(request)

                return context.json(response.getBody)
            },
            new ReceiptsPayloadSchemas.GET.Request(),
            new ReceiptsPayloadSchemas.GET.Response()
        )
    }
}