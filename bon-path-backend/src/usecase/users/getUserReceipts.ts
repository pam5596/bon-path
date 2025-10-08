import BaseUseCase from "@usecase/_interface";
import { UserPayloads } from "@share/payloads";
import { UsersPayloadSchemas } from "@payload";
import { HonoJwtClient } from "@client";
import { ReceiptRepository } from "@repository";
import { JWTPayload } from "hono/utils/jwt/types";
import { LoginSessionEntity } from "@models/entity";

export class GetUserReceiptsUseCase implements BaseUseCase<
    UserPayloads.Receipts.GET.Request,
    UserPayloads.Receipts.GET.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { receipt: ReceiptRepository },
        public request: UsersPayloadSchemas.Receipts.GET.Request
    ) {}

    async execute() {
        const jwt_payload = await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        ) as LoginSessionEntity['toPrimitives'] & JWTPayload
        const session = LoginSessionEntity.fromPrimitives(jwt_payload)
        const { isChecked } = this.request.toValueObjectQuery()

        const receipts = await this.repositories.receipt.selectByUserId(
            session.getValues.userId,
            isChecked ? { isChecked } : undefined
        )

        return new UsersPayloadSchemas.Receipts.GET.Response({
            body: {
                receipts: receipts.map((receipt) => ({
                    ...receipt.toPrimitives,
                    id: receipt.id!.value,
                    createdAt: receipt.getCreatedAt!.value
                }))
            }
        })
    }
}