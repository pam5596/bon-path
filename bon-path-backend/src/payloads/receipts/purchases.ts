import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { ReceiptPayloads } from "@share/payloads";
import { CreatedAt, Id, PurchasePrice, PurchaseQuantity } from "@models/valueObject";

export namespace PurchasesSchemas {
    export namespace GET {
        export class Request extends BasePayload<ReceiptPayloads.Purchases.GET.Request> {
            schema() {
                return {
                    params: z.strictObject({
                        receiptId: Id.schema()
                    })
                }
            }

            toValueObjectParams() {
                return {
                    receiptId: new Id(this.getParams.receiptId)
                }
            }
        }

        export class Response extends BasePayload<ReceiptPayloads.Purchases.GET.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        purchases: z.array(
                            z.strictObject({
                                id: Id.schema(),
                                storeId: Id.schema(),
                                productId: Id.schema(),
                                price: PurchasePrice.schema(),
                                quantity: PurchaseQuantity.schema(),
                                createdAt: CreatedAt.schema()
                            })
                        )
                    })
                }
            }

            toValueObjectBody() {
                return {
                    purchases: this.getBody.purchases.map(
                        (purchase) => ({
                            id: new Id(purchase.id),
                            storeId: new Id(purchase.storeId),
                            productId: new Id(purchase.productId),
                            price: new PurchasePrice(purchase.price),
                            quantity: new PurchaseQuantity(purchase.quantity),
                            createdAt: new CreatedAt(purchase.createdAt)
                        })
                    )
                }
            }
        }
    }
}