import { HonoJwtClient } from "@client";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { UseCaseError } from "@lib/error";
import { StoresPayloadSchemas } from "@payload";
import { StoreRepository } from "@repository";
import { StorePayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class GetStoreUseCase implements BaseUseCase<
    StorePayloads.GET.Request,
    StorePayloads.GET.Response
>{
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { store: StoreRepository },
        public request: StoresPayloadSchemas.GET.Request
    ){}

    async execute() {
        await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        )
        const params = this.request.toValueObjectParams()

        const store = await this.repositories.store.selectById(params.id)

        if (!store) throw new UseCaseError(
            404,
            ERROR_MESSAGES.usecase.storeNotFound.detail,
            ERROR_MESSAGES.usecase.storeNotFound.issues,
            this.constructor.name,
            this.request.getParams
        )

        return new StoresPayloadSchemas.GET.Response({
            body: {
                ...store.toPrimitives,
                createdAt: store.getCreatedAt!.value
            }
        })
    }
}