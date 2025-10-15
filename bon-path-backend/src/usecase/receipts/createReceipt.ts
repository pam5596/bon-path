import BaseUseCase from "@usecase/_interface";
import { ReceiptPayloads } from "@share/payloads";
import { ReceiptsPayloadSchemas } from "@payload";
import { HonoJwtClient } from "@client";
import { ReceiptRepository } from "@repository";
import { LoginSessionEntity, ReceiptEntity } from "@models/entity";
import { ReceiptIsChecked } from "@models/valueObject";

export class CreateReceiptUseCase implements BaseUseCase<
    ReceiptPayloads.POST.Request,
    ReceiptPayloads.POST.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { receipt: ReceiptRepository },
    ) {}

    async execute(request: ReceiptsPayloadSchemas.POST.Request) {
        const jwt_payload = await this.clients.honoJwt.verify(
            request.getCookies.loginSessionId
        ) as LoginSessionEntity['toPrimitives']
        const session = LoginSessionEntity.fromPrimitives(jwt_payload)

        const receipt = new ReceiptEntity({
            ...request.toValueObjectBody(),
            userId: session.getValues.userId,
            isChecked: new ReceiptIsChecked(false)
        })

        const inserted_receipt = await this.repositories.receipt.insert(receipt)

        return new ReceiptsPayloadSchemas.POST.Response({
            body: {
                id: inserted_receipt.id!.value
            }
        })
    }
}