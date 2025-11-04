import { honoJwtLogin } from "@lib/clients";
import { storeRepository } from "@lib/repositories";
import { UsersPayloadSchemas } from "@payload";
import BaseRoute from "@routes/_interface";
import { GetUserPurchasesStoresUseCase } from "@usecase/index";
import { getCookie } from "hono/cookie";

export class GetUserPurchasesStoresRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/users/purchases/stores',
                tags: [
                    'ユーザー情報をリソースとするルート', 
                    '購入履歴をリソースとするルート',
                    '店舗情報をリソースとするルート'
                ],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async (context) => {
                const loginSessionId = getCookie(context, 'loginSessionId') as string;

                const request = new UsersPayloadSchemas.Purchases.Stores.GET.Request({
                    cookies: { loginSessionId }
                })
                const response = await new GetUserPurchasesStoresUseCase(
                    { honoJwt: honoJwtLogin },
                    { store: storeRepository }
                ).execute(request)

                return context.json(response.getBody)
            },
            new UsersPayloadSchemas.Purchases.Stores.GET.Request(),
            new UsersPayloadSchemas.Purchases.Stores.GET.Response()
        )
    }
}