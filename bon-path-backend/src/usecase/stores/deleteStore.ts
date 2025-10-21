import { StoresPayloadSchemas } from "@payload";
import { StoreRepository } from "@repository";
import { StorePayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class DeleteStoreUseCase implements BaseUseCase<
    StorePayloads.DELETE.Request
>{
    constructor(
        public repositories: { store: StoreRepository },
    ){}

    async execute(request: StoresPayloadSchemas.DELETE.Request) {
        const params = request.toValueObjectParams();

        await this.repositories.store.deleteById(params.id)
    }
}