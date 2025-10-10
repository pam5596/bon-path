import { HonoJwtClient } from "@client";
import { StoreEntity } from "@models/entity";
import { StoresPayloadSchemas } from "@payload";
import { StoreRepository } from "@repository";
import { StorePayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class CreateStoreUseCase implements BaseUseCase<
    StorePayloads.POST.Request,
    StorePayloads.POST.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { store: StoreRepository },
        public request: StoresPayloadSchemas.POST.Request
    ){}

    async execute() {
        await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        )
        const body = this.request.toValueObjectBody()

        const store = new StoreEntity(body)
        const inserted_store = await this.repositories.store.insert(store)

        return new StoresPayloadSchemas.POST.Response({
            body: { 
                id: inserted_store.id!.value
            }
        })
    }
}