import { getCookie } from "hono/cookie";
import BaseRoute from "../_interface";
import { PurchasesPayloadSchemas } from "@payload";
import { CreatePurchasesUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { purchaseRepository } from "@lib/repositories";

export class CreatePurchasesRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'post',
                path: '/purchases',
                tags: ['購入履歴をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 201
            },
            async (context) => {
                const loginSessionId = getCookie(context, 'loginSessionid') as string;
                const body = await context.req.json()

                const request = new PurchasesPayloadSchemas.POST.Request({
                    cookies: { loginSessionId },
                    body
                })

                await new CreatePurchasesUseCase(
                    { honoJwt: honoJwtLogin },
                    { purchase: purchaseRepository }
                ).execute(request)
            },
            new PurchasesPayloadSchemas.POST.Request()
        )
    }
}