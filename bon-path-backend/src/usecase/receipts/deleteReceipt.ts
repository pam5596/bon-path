import BaseUseCase from "@usecase/_interface";
import { ReceiptPayloads } from "@share/payloads";
import { ReceiptsPayloadSchemas } from "@payload";
import { HonoJwtClient } from "@client";
import { ReceiptRepository } from "@repository";
import { LoginSessionEntity } from "@models/entity";
import { UseCaseError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

export class DeleteReceiptUseCase implements BaseUseCase<
    ReceiptPayloads.DELETE.Request
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { receipt: ReceiptRepository },
    ){}

    async execute(request: ReceiptsPayloadSchemas.DELETE.Request) {
        const jwt_payload = await this.clients.honoJwt.verify(
            request.getCookies.loginSessionId
        ) as LoginSessionEntity['toPrimitives']
        const session = LoginSessionEntity.fromPrimitives(jwt_payload)
        const params = request.toValueObjectParams()

        const receipt = await this.repositories.receipt.selectById(params.id)
        if (!receipt) throw new UseCaseError(
            404,
            ERROR_MESSAGES.usecase.receiptNotFound.detail,
            ERROR_MESSAGES.usecase.receiptNotFound.issues,
            this.constructor.name,
            request.getParams
        )

        if (!receipt.userId.equals(session.getValues.userId)) throw new UseCaseError(
            403,
            ERROR_MESSAGES.usecase.receiptNotAccessible.detail,
            ERROR_MESSAGES.usecase.receiptNotAccessible.issues,
            this.constructor.name,
            request.getParams
        )

        await this.repositories.receipt.deleteById(params.id)
    }
}