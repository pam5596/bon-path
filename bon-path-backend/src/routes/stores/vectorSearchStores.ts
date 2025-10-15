import { getCookie } from "hono/cookie";
import BaseRoute from "../_interface";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { StorePayloads } from "@share/payloads";
import { StoresPayloadSchemas } from "@payload";
import { VectorSearchStoresUseCase } from "@usecase/index";
import { honoJwtLogin, prismaVector } from "@lib/clients";
import { storeRepository, storeVectorRepository } from "@lib/repositories";

export class VectorSearchStoresRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/stores/vector-search',
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

                const query = context.req.query() as unknown as StorePayloads.VectorSearch.GET.Request['query']

                const request = new StoresPayloadSchemas.VectorSearch.GET.Request({
                    cookies: { loginSessionId },
                    query
                })

                const response = await new VectorSearchStoresUseCase(
                    { honoJwt: honoJwtLogin, prismaVector },
                    { store: storeRepository, storeVector: storeVectorRepository }
                ).execute(request)

                return context.json(response.getBody)
            },
            new StoresPayloadSchemas.VectorSearch.GET.Request(),
            new StoresPayloadSchemas.VectorSearch.GET.Response()
        )
    }
}