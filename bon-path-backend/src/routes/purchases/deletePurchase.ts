import { getCookie } from "hono/cookie";
import BaseRoute from "../_interface";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { PurchasesPayloadSchemas } from "@payload";
import { DeletePurchaseUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { purchaseRepository } from "@lib/repositories";

export class DeletePurchaseRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'delete',
                path: '/purchases/:id',
                tags: ['購入履歴をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 204
            },
            async (context) => {
                const loginSessionId = getCookie(context, 'loginSessionid') as string;
                const { id } = context.req.param()
                if (isNaN(Number(id))) throw this.createError(
                    ERROR_MESSAGES.route.invalidParams,
                    context.req.param()
                )

                const request = new PurchasesPayloadSchemas.DELETE.Request({
                    cookies: { loginSessionId },
                    params: { id: Number(id) }
                })

                await new DeletePurchaseUseCase(
                    { honoJwt: honoJwtLogin },
                    { purchase: purchaseRepository }
                ).execute(request)
            },
            new PurchasesPayloadSchemas.DELETE.Request()
        )
    }
}