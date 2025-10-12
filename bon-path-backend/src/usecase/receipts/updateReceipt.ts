import BaseUseCase from "@usecase/_interface";
import { ReceiptPayloads } from "@share/payloads";
import { ReceiptsPayloadSchemas } from "@payload";
import { HonoJwtClient } from "@client";
import { ReceiptRepository } from "@repository";
import { LoginSessionEntity } from "@models/entity";
import { UseCaseError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

export class UpdateReceiptUseCase implements BaseUseCase<
    ReceiptPayloads.PATCH.Request
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { receipt: ReceiptRepository },
        public request: ReceiptsPayloadSchemas.PATCH.Request
    ) {}

    async execute() {
        const jwt_payload = await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        ) as LoginSessionEntity['toPrimitives']
        const session = LoginSessionEntity.fromPrimitives(jwt_payload)
        const params = this.request.toValueObjectParams()
        const { isChecked } = this.request.toValueObjectBody()

        const receipt = await this.repositories.receipt.selectById(params.id)
        if (!receipt) throw new UseCaseError(
            404,
            ERROR_MESSAGES.usecase.receiptNotFound.detail,
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

        receipt.toggleIsChecked()
        if (!receipt.getValues.isChecked.equals(isChecked)) throw new UseCaseError(
            400,
            ERROR_MESSAGES.usecase.receiptNotFound.detail,
            ERROR_MESSAGES.usecase.receiptNotFound.issues,
            this.constructor.name,
            this.request.getBody
        )

        await this.repositories.receipt.update(receipt)
    }
}