import { HonoJwtClient } from "@client";
import { ERROR_MESSAGES } from "@constants/errorMessages";
import { UseCaseError } from "@error";
import { StoreEntity, LoginSessionEntity } from "@models/entity";
import { StoresPayloadSchemas } from "@payload";
import { StoreRepository } from "@repository";
import { StorePayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class GetStoresUseCase implements BaseUseCase<
    StorePayloads.Stores.GET.Request,
    StorePayloads.Stores.GET.Response
>{
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { store: StoreRepository },
        public request: StoresPayloadSchemas.Stores.GET.Request
    ){}

    async execute() {
        const jwt_payload = await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        ) as LoginSessionEntity['toPrimitives']
        const session = LoginSessionEntity.fromPrimitives(jwt_payload)
        const { latitude, longitude, radius, limit } = this.request.toValueObjectParams()

        // latitude | longitude | raidus    | if
        // 0        | 0         | 0         | 0
        // 1        | 0         | 0         | 1
        // 0        | 1         | 0         | 1
        // 0        | 0         | 1         | 1
        // 1        | 1         | 0         | 1
        // 0        | 1         | 1         | 1
        // 1        | 0         | 1         | 1
        // 1        | 1         | 1         | 0

        if ((latitude || longitude || radius) && !(latitude && longitude && radius)) 
            throw new UseCaseError(
                400,
                ERROR_MESSAGES.usecase.invalidlocationParams.detail,
                ERROR_MESSAGES.usecase.invalidlocationParams.issues,
                this.constructor.name,
                this.request.getParams
            )
        
        // const stores = await this.repositories.store.selectAll();
    }
}