import { getCookie } from "hono/cookie";
import BaseRoute from "../_interface";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { PurchasesPayloadSchemas } from "@payload";
import { GetPurchasesUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { purchaseRepository } from "@lib/repositories";

export class GetPurchaseRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/purchases/:id',
                tags: ['購入履歴をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async (context) => {
                const loginSessionId = getCookie(context, 'loginSessionid') as string;
                const { id } = context.req.param()
                if (isNaN(Number(id))) throw this.createError(
                    ERROR_MESSAGES.route.invalidParams,
                    context.req.param()
                )

                const request = new PurchasesPayloadSchemas.GET.Request({
                    cookies: { loginSessionId },
                    params: { id: Number(id) }
                })

                const response = await new GetPurchasesUseCase(
                    { honoJwt: honoJwtLogin },
                    { purchase: purchaseRepository }
                ).execute(request)

                return context.json(response.getBody)
            },
            new PurchasesPayloadSchemas.GET.Request(),
            new PurchasesPayloadSchemas.GET.Response()
        )
    }
}