import { StoreEntity } from "@models/entity";
import { StoresPayloadSchemas } from "@payload";
import { StoreRepository, StoreVectorRepository } from "@repository";
import { StorePayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class CreateStoreUseCase implements BaseUseCase<
    StorePayloads.POST.Request,
    StorePayloads.POST.Response
> {
    constructor(
        public repositories: { 
            store: StoreRepository,
            storeVector: StoreVectorRepository
        },
    ){}

    async execute(request: StoresPayloadSchemas.POST.Request) {
        const body = request.toValueObjectBody()

        const store = new StoreEntity(body)
        const inserted_store = await this.repositories.store.insert(store)

        await this.repositories.storeVector.insertMany([inserted_store])

        return new StoresPayloadSchemas.POST.Response({
            body: { 
                id: inserted_store.id!.value
            }
        })
    }
}