import { HonoJwtClient } from "@client";
import { StoresPayloadSchemas } from "@payload";
import { StoreRepository } from "@repository";
import { StorePayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class DeleteStoreUseCase implements BaseUseCase<
    StorePayloads.DELETE.Request
>{
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { store: StoreRepository },
        public request: StoresPayloadSchemas.DELETE.Request
    ){}

    async execute() {
        await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        )
        const params = this.request.toValueObjectParams();

        await this.repositories.store.deleteById(params.id)
    }
}