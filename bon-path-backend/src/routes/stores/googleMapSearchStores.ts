import { getCookie } from "hono/cookie";
import BaseRoute from "../_interface";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { StorePayloads } from "@share/payloads";
import { StoresPayloadSchemas } from "@payload";
import { GoogleMapSearchStoresUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { searchStorePlaceService } from "@lib/services";

export class GoogleMapSearchStoresRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/stores/google-map-search',
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

                const query = context.req.query() as unknown as StorePayloads.GoogleMapSearch.GET.Request['query']
                
                const request = new StoresPayloadSchemas.GoogleMapSearch.GET.Request({
                    cookies: { loginSessionId },
                    query
                })

                const response = await new GoogleMapSearchStoresUseCase(
                    { honoJwt: honoJwtLogin },
                    { searchStorePlace: searchStorePlaceService }
                ).execute(request)

                return context.json(response.getBody)
            },
            new StoresPayloadSchemas.GoogleMapSearch.GET.Request(),
            new StoresPayloadSchemas.GoogleMapSearch.GET.Response()
        )
    }
}