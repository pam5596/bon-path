import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { PurchasePayloads } from "@share/payloads";
import { CreatedAt, Id, PurchasePrice, PurchaseQuantity } from "@models/valueObject";

export namespace PurchasesPayloadSchemas {
    export namespace GET {
        export class Request extends BasePayload<PurchasePayloads.GET.Request> {
            schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    }),
                    params: z.strictObject({
                        id: Id.schema()
                    })
                }
            }

            toValueObjectParams() {
                return {
                    id: new Id(this.getParams.id)
                }
            }
        }

        export class Response extends BasePayload<PurchasePayloads.GET.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        receiptId: Id.schema(),
                        storeId: Id.schema(),
                        productId: Id.schema(),
                        price: PurchasePrice.schema(),
                        quantity: PurchaseQuantity.schema(),
                        createdAt: CreatedAt.schema()
                    })
                }
            }

            toValueObjectBody() {
                return {
                    receiptId: new Id(this.getBody.receiptId),
                    storeId: new Id(this.getBody.storeId),
                    productId: new Id(this.getBody.productId),
                    price: new PurchasePrice(this.getBody.price),
                    quantity: new PurchaseQuantity(this.getBody.quantity),
                    createdAt: new CreatedAt(this.getBody.createdAt)
                }
            }
        }
    }

    export namespace POST {
        export class Request extends BasePayload<PurchasePayloads.POST.Request> {
            schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    }),
                    body: z.strictObject({
                        purchases: z.array(
                            z.strictObject({
                                receiptId: Id.schema(),
                                storeId: Id.schema(),
                                productId: Id.schema(),
                                price: PurchasePrice.schema(),
                                quantity: PurchaseQuantity.schema()
                            }
                        ))
                    })
                }
            }
        }
    }

    export namespace DELETE {
        export class Request extends BasePayload<PurchasePayloads.DELETE.Request> {
            schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    }),
                    params: z.strictObject({
                        id: Id.schema()
                    })
                }
            }

            toValueObjectParams() {
                return {
                    id: new Id(this.getParams.id)
                }
            }
        }
    }
}