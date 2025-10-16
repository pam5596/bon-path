import BaseRoute from "../_interface";
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
                const query = context.req.query()
                
                const request = new StoresPayloadSchemas.GoogleMapSearch.GET.Request({
                    query: {
                        keyword: query.keyword,
                        limit: isNaN(Number(query.limit)) ? undefined: Number(query.limit)
                    }
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