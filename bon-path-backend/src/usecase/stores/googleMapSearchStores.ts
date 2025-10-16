import { StorePayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";
import { HonoJwtClient } from "@client";
import { StoresPayloadSchemas } from "@payload";
import { SearchStorePlaceService } from "@service";

export class GoogleMapSearchStoresUseCase implements BaseUseCase<
    StorePayloads.GoogleMapSearch.GET.Request,
    StorePayloads.GoogleMapSearch.GET.Response
>{
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public services: { searchStorePlace: SearchStorePlaceService },
    ){}

    async execute(request: StoresPayloadSchemas.GoogleMapSearch.GET.Request) {
        const { keyword, limit } = request.toValueObjectQuery()

        const stores = await this.services.searchStorePlace.execute({
            query: keyword,
            maxCount: limit
        })

        return new StoresPayloadSchemas.GoogleMapSearch.GET.Response({
            body: {
                stores: stores.map(
                    store => ({ ...store.toPrimitives })
                )
            }
        })
    }
}