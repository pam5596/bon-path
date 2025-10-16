import { HonoJwtClient, PrismaVectorClient } from "@client";
import { StoresPayloadSchemas } from "@payload";
import { StoreRepository, StoreVectorRepository } from "@repository";
import { StorePayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class VectorSearchStoresUseCase implements BaseUseCase<
    StorePayloads.VectorSearch.GET.Request,
    StorePayloads.VectorSearch.GET.Response
>{
    constructor(
        public clients: { honoJwt: HonoJwtClient, prismaVector: PrismaVectorClient },
        public repositories: { store: StoreRepository, storeVector: StoreVectorRepository },
    ){}

    async execute(request: StoresPayloadSchemas.VectorSearch.GET.Request) {
        const { keyword, limit } = request.toValueObjectQuery()

        const storeIds = await this.repositories.storeVector.searchStoreIdByName(keyword, limit)
        const stores = await this.repositories.store.selectByIds(storeIds)

        return new StoresPayloadSchemas.VectorSearch.GET.Response({
            body: {
                stores: stores.map(store => ({
                    ...store.toPrimitives,
                    id: store.id!.value,
                    createdAt: store.getCreatedAt!.value
                }))
            }
        })
    }
}