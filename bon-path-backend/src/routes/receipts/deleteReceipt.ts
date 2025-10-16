import { getCookie } from "hono/cookie";
import BaseRoute from "../_interface";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { ReceiptsPayloadSchemas } from "@payload";
import { DeleteReceiptUseCase } from "@usecase/receipts/deleteReceipt";
import { honoJwtLogin } from "@lib/clients";
import { receiptRepository } from "@lib/repositories";

export class DeleteReceiptRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'delete',
                path: '/receipts/:id',
                tags: ['レシート情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 204
            },
            async(context) => {
                const loginSessionId = getCookie(context, 'loginSessionid') as string;

                const { id } = context.req.param()
                if (isNaN(Number(id))) throw this.createError(
                    ERROR_MESSAGES.route.invalidParams,
                    context.req.param()
                )

                const request = new ReceiptsPayloadSchemas.DELETE.Request({
                    cookies: { loginSessionId },
                    params: { id: Number(id) }
                })

                await new DeleteReceiptUseCase(
                    { honoJwt: honoJwtLogin },
                    { receipt: receiptRepository }
                ).execute(request)
            },
            new ReceiptsPayloadSchemas.DELETE.Request()
        )
    }
}