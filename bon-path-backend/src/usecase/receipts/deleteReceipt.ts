import BaseUseCase from "@usecase/_interface";
import { ReceiptPayloads } from "@share/payloads";
import { ReceiptsPayloadSchemas } from "@payload";
import { HonoJwtClient } from "@client";
import { ReceiptRepository } from "@repository";
import { LoginSessionEntity } from "@models/entity";
import { UseCaseError } from "@error";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export class DeleteReceiptUseCase implements BaseUseCase<
    ReceiptPayloads.DELETE.Request
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { receipt: ReceiptRepository },
        public request: ReceiptsPayloadSchemas.PATCH.Request
    ){}

    async execute() {
        const jwt_payload = await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        ) as LoginSessionEntity['toPrimitives']
        const session = LoginSessionEntity.fromPrimitives(jwt_payload)
        const params = this.request.toValueObjectParams()

        const receipt = await this.repositories.receipt.selectById(params.id)
        if (!receipt) throw new UseCaseError(
            404,
            ERROR_MESSAGES.usecase.receiptNotFound.detial,
            ERROR_MESSAGES.usecase.receiptNotFound.issues,
            this.constructor.name,
            this.request.getParams
        )

        if (!receipt.userId.equals(session.getValues.userId)) throw new UseCaseError(
            403,
            ERROR_MESSAGES.usecase.receiptNotAccessible.detail,
            ERROR_MESSAGES.usecase.receiptNotAccessible.issues,
            this.constructor.name,
            this.request.getParams
        )

        await this.repositories.receipt.deleteById(params.id)
    }
}