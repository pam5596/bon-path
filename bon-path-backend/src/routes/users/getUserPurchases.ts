import BaseRoute from "../_interface";
import { UsersPayloadSchemas } from "@payload";
import { getCookie } from "hono/cookie";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { GetUserPurchasesUseCase } from "@usecase/users/getUserPurchases";
import { honoJwtLogin } from "@lib/clients";
import { purchaseRepository } from "@lib/repositories";

export class GetUserPurchases extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/users/purchases',
                tags: ['ユーザー情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async (context) => {
                const loginSessionId = getCookie(context, 'loginSessionid');
                if (!loginSessionId) throw this.createError(
                    ERROR_MESSAGES.route.invalidCookie,
                    getCookie(context)
                )

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