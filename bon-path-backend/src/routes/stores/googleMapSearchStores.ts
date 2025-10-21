import BaseRoute from "../_interface";
import { StoresPayloadSchemas } from "@payload";
import { GoogleMapSearchStoresUseCase } from "@usecase/index";
import { searchStorePlaceService } from "@lib/services";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

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
                const query = new StoresPayloadSchemas.GoogleMapSearch.GET.Request()
                    .schema().query.safeParse(context.req.query())
                if (!query.success) throw this.createError(
                    ERROR_MESSAGES.route.invalidQuery,
                    query
                )
                
                const request = new StoresPayloadSchemas.GoogleMapSearch.GET.Request({
                    query: query.data
                })

                const response = await new GoogleMapSearchStoresUseCase(
                    { searchStorePlace: searchStorePlaceService }
                ).execute(request)

                return context.json(response.getBody)
            },
            new StoresPayloadSchemas.GoogleMapSearch.GET.Request(),
            new StoresPayloadSchemas.GoogleMapSearch.GET.Response()
        )
    }
}