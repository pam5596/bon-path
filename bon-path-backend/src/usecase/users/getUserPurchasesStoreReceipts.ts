import { UserPayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";
import { UsersPayloadSchemas } from "@payload";
import { LoginSessionEntity } from "@models/entity";
import { HonoJwtClient } from "@client";
import { ReceiptRepository } from "@repository";

export class GetUserPurchasesStoreReceiptsUseCase implements BaseUseCase<
    UserPayloads.Purchases.Stores.Receipts.GET.Request,
    UserPayloads.Purchases.Stores.Receipts.GET.Response
>{
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { receipt: ReceiptRepository },
    ){}

    async execute(request: UsersPayloadSchemas.Purchases.Stores.Receipts.GET.Request) {
        const jwt_payload = await this.clients.honoJwt.verify(
            request.getCookies.loginSessionId
        ) as LoginSessionEntity['toPrimitives']
        const session = LoginSessionEntity.fromPrimitives(jwt_payload)

        const receipts = await this.repositories.receipt.selectByUserPurchasesStore(
            session.getValues.userId,
            request.toValueObjectParams().storeId
        )

        return new UsersPayloadSchemas.Purchases.Stores.Receipts.GET.Response({
            body: {
                receipts: receipts.map(
                    receipt => ({
                        ...receipt.toPrimitives,
                        id: receipt.id!.value,
                        createdAt: receipt.getCreatedAt!.value
                    })
                )
            }
        })
    }
}