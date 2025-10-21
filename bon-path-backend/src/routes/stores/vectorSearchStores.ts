import BaseRoute from "../_interface";
import { StoresPayloadSchemas } from "@payload";
import { VectorSearchStoresUseCase } from "@usecase/index";
import { prismaVector } from "@lib/clients";
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
                const { keyword, limit } = context.req.query()

                const request = new StoresPayloadSchemas.VectorSearch.GET.Request({
                    query: {
                        keyword: keyword,
                        limit: limit ? Number(limit) : undefined
                    }
                })

                const response = await new VectorSearchStoresUseCase(
                    { prismaVector },
                    { store: storeRepository, storeVector: storeVectorRepository }
                ).execute(request)

                return context.json(response.getBody)
            },
            new StoresPayloadSchemas.VectorSearch.GET.Request(),
            new StoresPayloadSchemas.VectorSearch.GET.Response()
        )
    }
}