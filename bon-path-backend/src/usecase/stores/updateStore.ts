import { HonoJwtClient } from "@client";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { UseCaseError } from "@lib/error";
import { StoreEntity } from "@models/entity";
import { StoresPayloadSchemas } from "@payload";
import { StoreRepository } from "@repository";
import { StorePayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class UpdateStoreUseCase implements BaseUseCase<
    StorePayloads.PATCH.Request
>{
    constructor(   
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { store: StoreRepository },
        public request: StoresPayloadSchemas.PATCH.Request
    ){}

    async execute() {
        await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        )
        const params = this.request.toValueObjectParams()
        const body = this.request.toValueObjectBody()

        const store = await this.repositories.store.selectById(params.id)
        if (!store) throw new UseCaseError(
            404,
            ERROR_MESSAGES.usecase.storeNotFound.detail,
            ERROR_MESSAGES.usecase.storeNotFound.issues,
            this.constructor.name,
            this.request.getParams
        )

        await this.repositories.store.update(store)
    }
}