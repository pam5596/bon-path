import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { GptOcrPayloads } from "@share/payloads";
import { ProductName, PurchasePrice, PurchaseQuantity, ReceiptImageUrl, StoreName } from "@models/valueObject";

export namespace GptOcrPayloadSchemas {
    export namespace POST {
        export class Request extends BasePayload<GptOcrPayloads.POST.Request> {
            schema() {
                return {
                    body: z.strictObject({
                        images: z.array(z.string())
                    })
                }
            }

            toValueObjectBody(){
                return {
                    images: this.getBody.images.map(
                        url => new ReceiptImageUrl(url)
                    )
                }
            }
        }

        export class Response extends BasePayload<GptOcrPayloads.POST.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        store: z.strictObject({
                            name: StoreName.schema()
                        }),
                        products: z.array(
                            z.strictObject({
                                name: ProductName.schema(),
                                price: PurchasePrice.schema(),
                                quantity: PurchaseQuantity.schema()
                            })
                        )
                    })
                }
            }

            toValueObjectBody() {
                return {
                    store: {
                        name: new StoreName(this.getBody.store.name)
                    },
                    products: this.getBody.products.map(
                        product => ({
                            name: new ProductName(product.name),
                            price: new PurchasePrice(product.price),
                            quantity: new PurchaseQuantity(product.quantity)
                        })
                    )
                }
            }
        }
    }
}