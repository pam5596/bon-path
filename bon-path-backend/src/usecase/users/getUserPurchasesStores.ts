import { HonoJwtClient } from "@client";
import { LoginSessionEntity } from "@models/entity";
import { UsersPayloadSchemas } from "@payload";
import { StoreRepository } from "@repository";
import { UserPayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class GetUserPurchasesStoresUseCase implements BaseUseCase<
    UserPayloads.Purchases.Stores.GET.Request,
    UserPayloads.Purchases.Stores.GET.Response
>{
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { store: StoreRepository },
    ){}

    async execute(request: UsersPayloadSchemas.Purchases.Stores.GET.Request) {
        const jwt_payload = await this.clients.honoJwt.verify(
            request.getCookies.loginSessionId
        ) as LoginSessionEntity['toPrimitives']
        const session = LoginSessionEntity.fromPrimitives(jwt_payload)

        const stores = await this.repositories.store.selectByUserPurchases(session.getValues.userId)

        return new UsersPayloadSchemas.Purchases.Stores.GET.Response({
            body: {
                stores: stores.map(
                    store => ({
                        ...store.toPrimitives,
                        id: store.id!.value,
                        createdAt: store.getCreatedAt!.value
                    })
                )
            }
        })
    }
}