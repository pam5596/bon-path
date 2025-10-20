import BaseRoute from "../_interface";
import { getCookie } from "hono/cookie";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { ReceiptsPayloadSchemas } from "@payload";
import { UpdateReceiptUseCase } from "@usecase/receipts/updateReceipt";
import { honoJwtLogin } from "@lib/clients";
import { receiptRepository } from "@lib/repositories";

export class UpdateReceiptRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'patch',
                path: '/receipts/:id',
                tags: ['レシート情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 204
            },
            async (context) => {
                const loginSessionId = getCookie(context, 'loginSessionId') as string;

                const { id } = context.req.param()
                if (isNaN(Number(id))) throw this.createError(
                    ERROR_MESSAGES.route.invalidParams,
                    context.req.param()
                )

                const body = await context.req.json()

                const request = new ReceiptsPayloadSchemas.PATCH.Request({
                    cookies: { loginSessionId },
                    params: { id: Number(id) },
                    body
                });

                await new UpdateReceiptUseCase(
                    { honoJwt: honoJwtLogin },
                    { receipt: receiptRepository },
                ).execute(request)

                return context.body(null, 204)
            },
            new ReceiptsPayloadSchemas.PATCH.Request()
        )
    }
}