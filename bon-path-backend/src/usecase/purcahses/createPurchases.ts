import { HonoJwtClient } from "@client";
import { PurchaseEntity, LoginSessionEntity } from "@models/entity";
import { PurchasesPayloadSchemas } from "@payload";
import { PurchaseRepository } from "@repository";
import { PurchasePayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class CreatePurchasesUseCase implements BaseUseCase<
    PurchasePayloads.POST.Request
>{
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { purchase: PurchaseRepository },
        public request: PurchasesPayloadSchemas.POST.Request
    ){}

    async execute() {
        const jwt_payload = await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        ) as LoginSessionEntity['toPrimitives']
        const session = LoginSessionEntity.fromPrimitives(jwt_payload)
        const body = this.request.toValueObjectBody()

        const purchases = body.purchases.map(
            purchase => new PurchaseEntity({
                ...purchase,
                userId: session.getValues.userId
            })
        )

        await this.repositories.purchase.insertMany(purchases)
    }
}