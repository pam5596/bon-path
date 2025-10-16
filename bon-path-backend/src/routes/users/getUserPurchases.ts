import BaseRoute from "../_interface";
import { UsersPayloadSchemas } from "@payload";
import { getCookie } from "hono/cookie";
import { GetUserPurchasesUseCase } from "@usecase/users/getUserPurchases";
import { honoJwtLogin } from "@lib/clients";
import { purchaseRepository } from "@lib/repositories";

export class GetUserPurchasesRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/users/purchases',
                tags: ['ユーザー情報をリソースとするルート', '購入履歴をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async (context) => {
                const loginSessionId = getCookie(context, 'loginSessionid') as string;

                const request = new UsersPayloadSchemas.Purchases.GET.Request({
                    cookies: { loginSessionId }
                })
                
                const response = await new GetUserPurchasesUseCase(
                    { honoJwt: honoJwtLogin },
                    { purchase: purchaseRepository },
                ).execute(request)

                return context.json(response.getBody)
            },
            new UsersPayloadSchemas.Purchases.GET.Request(),
            new UsersPayloadSchemas.Purchases.GET.Response()
        )
    }
}