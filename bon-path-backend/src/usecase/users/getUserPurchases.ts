import BaseUseCase from "@usecase/_interface";
import { UserPayloads } from "@share/payloads";
import { UsersPayloadSchemas } from "@payload";
import { HonoJwtClient } from "@client";
import { PurchaseRepository } from "@repository";
import { LoginSessionEntity } from "@models/entity";

export class GetUserPurchasesUseCase implements BaseUseCase<
    UserPayloads.Purchases.GET.Request,
    UserPayloads.Purchases.GET.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { purchase: PurchaseRepository },
        public request: UsersPayloadSchemas.Purchases.GET.Request
    ) {}

    async execute() {
        const jwt_payload = await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        ) as LoginSessionEntity['toPrimitives']
        const session = LoginSessionEntity.fromPrimitives(jwt_payload)

        const purchases = await this.repositories.purchase.selectByUserId(session.getValues.userId)

        return new UsersPayloadSchemas.Purchases.GET.Response({
            body: {
                purchases: purchases.map((purchase) => ({
                    ...purchase.toPrimitives,
                    id: purchase.id!.value,
                    createdAt: purchase.getCreatedAt!.value
                }))
            }
        })
    }
}