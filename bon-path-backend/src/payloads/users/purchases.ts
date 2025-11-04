import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { UserPayloads } from "@share/payloads";
import { CreatedAt, Id, PurchasePrice, PurchaseQuantity, StoreGoogleMapLink, StoreImage, StoreLatitude, StoreLongitude, StoreName } from "@models/valueObject";

export namespace PurchasesSchemas {
    export namespace GET {
        export class Request extends BasePayload<UserPayloads.Purchases.GET.Request> {
            schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    })
                }
            }
        }

        export class Response extends BasePayload<UserPayloads.Purchases.GET.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        purchases: z.array(
                            z.strictObject({
                                id: Id.paramSchema(),
                                receiptId: Id.paramSchema(),
                                storeId: Id.paramSchema(),
                                productId: Id.paramSchema(),
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
                            receiptId: new Id(purchase.receiptId),
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

    export namespace Stores {
        export namespace GET {
            export class Request extends BasePayload<UserPayloads.Purchases.Stores.GET.Request> {
                schema() {
                    return {
                        cookies: z.strictObject({
                            loginSessionId: z.string()
                        })
                    }
                }
            }
    
            export class Response extends BasePayload<UserPayloads.Purchases.Stores.GET.Response> {
                schema() {
                    return {
                        body: z.strictObject({
                            stores: z.array(
                                z.strictObject({
                                    id: Id.paramSchema(),
                                    name: StoreName.schema(),
                                    image: StoreImage.schema().optional(),
                                    latitude: StoreLatitude.schema().optional(),
                                    longitude: StoreLongitude.schema().optional(),
                                    googleMapLink: StoreGoogleMapLink.schema().optional(),
                                    createdAt: CreatedAt.schema()
                                })
                            )
                        })
                    }
                }
    
                toValueObjectBody() {
                    return {
                        stores: this.getBody.stores.map(
                            (store) => ({
                                id: new Id(store.id),
                                name: new StoreName(store.name),
                                image: store.image ? new StoreImage(store.image) : undefined,
                                latitude: store.latitude ? new StoreLatitude(store.latitude) : undefined,
                                longitude: store.longitude ? new StoreLongitude(store.longitude) : undefined,
                                googleMapLink: store.googleMapLink ? new StoreGoogleMapLink(store.googleMapLink) : undefined,
                                createdAt: new CreatedAt(store.createdAt)
                            })
                        )
                    }
                }
            }
        }
    }
}