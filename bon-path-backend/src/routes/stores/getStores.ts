import { getCookie } from "hono/cookie";
import BaseRoute from "../_interface";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { StorePayloads } from "@share/payloads";
import { StoresPayloadSchemas } from "@payload";
import { GetStoresUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { storeRepository } from "@lib/repositories";

export class GetStoresRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/stores',
                tags: ['店舗情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async (context) => {
                const loginSessionId = getCookie(context, 'loginSessionid');
                if (!loginSessionId) throw this.createError(
                    ERROR_MESSAGES.route.invalidCookie,
                    getCookie(context)
                )

                const query = context.req.query() as StorePayloads.Stores.GET.Request['query']
                const request = new StoresPayloadSchemas.Stores.GET.Request({
                    cookies: { loginSessionId },
                    query
                })

                const response = await new GetStoresUseCase(
                    { honoJwt: honoJwtLogin },
                    { store: storeRepository }
                ).execute(request)

                return context.json(response.getBody)
            },
            new StoresPayloadSchemas.Stores.GET.Request(),
            new StoresPayloadSchemas.Stores.GET.Response()
        )
    }
}