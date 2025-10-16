import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { UseCaseError } from "@lib/error";
import { StoresPayloadSchemas } from "@payload";
import { StoreRepository } from "@repository";
import { StorePayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class UpdateStoreUseCase implements BaseUseCase<
    StorePayloads.PATCH.Request
>{
    constructor(   
        public repositories: { store: StoreRepository },
    ){}

    async execute(request: StoresPayloadSchemas.PATCH.Request) {
        const params = request.toValueObjectParams()
        const body = request.toValueObjectBody()

        const store = await this.repositories.store.selectById(params.id)
        if (!store) throw new UseCaseError(
            404,
            ERROR_MESSAGES.usecase.storeNotFound.detail,
            ERROR_MESSAGES.usecase.storeNotFound.issues,
            this.constructor.name,
            request.getParams
        )

        store.newValues = body
        await this.repositories.store.update(store)
    }
}