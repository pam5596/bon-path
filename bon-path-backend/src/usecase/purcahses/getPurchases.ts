import { HonoJwtClient } from "@client";
import { ERROR_MESSAGES } from "@constants/errorMessages";
import { UseCaseError } from "@error";
import { LoginSessionEntity } from "@models/entity";
import { PurchasesPayloadSchemas } from "@payload";
import { PurchaseRepository } from "@repository";
import { PurchasePayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class GetPurchasesUseCase implements BaseUseCase<
    PurchasePayloads.GET.Request,
    PurchasePayloads.GET.Response
>{
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { purchase: PurchaseRepository },
        public request: PurchasesPayloadSchemas.GET.Request
    ){}

    async execute() {
        const jwt_payload = await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        ) as LoginSessionEntity['toPrimitives']
        const session = LoginSessionEntity.fromPrimitives(jwt_payload)
        const params = this.request.toValueObjectParams()

        const purchase = await this.repositories.purchase.selectById(params.id)
        if (!purchase) throw new UseCaseError(
            404,
            ERROR_MESSAGES.usecase.purchaseNotFound.detail,
            ERROR_MESSAGES.usecase.purchaseNotFound.issues,
            this.constructor.name,
            this.request.getParams
        )

        if (!purchase.userId.equals(session.getValues.userId)) throw new UseCaseError(
            403,
            ERROR_MESSAGES.usecase.purchaseNotAccessible.detail,
            ERROR_MESSAGES.usecase.purchaseNotAccessible.issues,
            this.constructor.name,
            this.request.getParams
        )

        return new PurchasesPayloadSchemas.GET.Response({
            body: {
                ...purchase.toPrimitives,
                createdAt: purchase.getCreatedAt!.value
            }
        })
    }
}