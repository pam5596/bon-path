import BaseRoute from "../_interface";
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
                const query = context.req.query();

                const request = new StoresPayloadSchemas.Stores.GET.Request({
                    query: Object.fromEntries(
                        Object.entries(query).map(
                            ([k,v]) => [k, isNaN(Number(v)) ? undefined : Number(v)]
                        )
                    )
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