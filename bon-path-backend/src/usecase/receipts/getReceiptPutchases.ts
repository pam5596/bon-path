import BaseUseCase from "@usecase/_interface";
import { ReceiptPayloads } from "@share/payloads";
import { ReceiptsPayloadSchemas } from "@payload";
import { PurchaseRepository } from "@repository";

export class GetReceiptPurchasesUsecase implements BaseUseCase<
    ReceiptPayloads.Purchases.GET.Request,
    ReceiptPayloads.Purchases.GET.Response
> {
    constructor(
        public repositories: { purchase: PurchaseRepository },
    ) {}

    async execute(request: ReceiptsPayloadSchemas.Purchases.GET.Request) {
        const params = request.toValueObjectParams()

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