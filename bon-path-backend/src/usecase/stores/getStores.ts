import { HonoJwtClient } from "@client";
import { ERROR_MESSAGES } from "@constants/errorMessages";
import { UseCaseError } from "@error";
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
        await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        )
        const { latitude, longitude, radius, limit } = this.request.toValueObjectParams()

        if ((latitude || longitude || radius) && !(latitude && longitude && radius)) 
            throw new UseCaseError(
                400,
                ERROR_MESSAGES.usecase.invalidLocationParams.detail,
                ERROR_MESSAGES.usecase.invalidLocationParams.issues,
                this.constructor.name,
                this.request.getParams
            )
        
        const stores = await this.repositories.store.selectAll({
            location: latitude && longitude && radius 
                ? { latitude, longitude, radius } 
                : undefined,
            limit
        });

        return new StoresPayloadSchemas.Stores.GET.Response({
            body: {
                stores: stores.map(
                    store => ({
                        ...store.toPrimitives,
                        id: store.id!.value,
                        createdAt: store.created!.value
                    })
                )
            }
        })
    }
}