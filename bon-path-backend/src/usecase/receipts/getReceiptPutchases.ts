import BaseUseCase from "@usecase/_interface";
import { ReceiptPayloads } from "@share/payloads";
import { ReceiptsPayloadSchemas } from "@payload";
import { HonoJwtClient } from "@client";
import { PurchaseRepository } from "@repository";

export class GetReceiptPurchasesUsecase implements BaseUseCase<
    ReceiptPayloads.Purchases.GET.Request,
    ReceiptPayloads.Purchases.GET.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { purchase: PurchaseRepository },
        public request: ReceiptsPayloadSchemas.Purchases.GET.Request
    ) {}

    async execute() {
        await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        )
        const params = this.request.toValueObjectParams()

        const purchases = await this.repositories.purchase.selectByReceiptId(params.receiptId);

        return new ReceiptsPayloadSchemas.Purchases.GET.Response({
            body: {
                purchases: purchases.map(
                    purchase => ({
                        id: purchase.id!.value,
                        createdAt: purchase.getCreatedAt!.value,
                        storeId: purchase.storeId.value,
                        productId: purchase.productId.value,
                        price: purchase.toPrimitives.price,
                        quantity: purchase.toPrimitives.quantity
                    })
                )
            }
        })
    }
}