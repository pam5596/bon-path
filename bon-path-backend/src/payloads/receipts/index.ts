import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { ReceiptPayloads } from "@share/payloads";
import { PurchasesSchemas } from "./purchases";
import { ImagesSchemas } from "./images";
import { CreatedAt, Id, ReceiptIsChecked, ReceiptLatitude, ReceiptLongitude } from "@models/valueObject";
import BaseValueObject from "@models/valueObject/_abstruct";

export namespace ReceiptPayloadSchemas {
    export import Purchases = PurchasesSchemas;
    export import Images = ImagesSchemas;

    export namespace GET {
        export class Request extends BasePayload<ReceiptPayloads.GET.Request> {
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

        export class Response extends BasePayload<ReceiptPayloads.GET.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        latitude: ReceiptLatitude.schema(),
                        longitude: ReceiptLongitude.schema(),
                        isChecked: ReceiptIsChecked.schema(),
                        createdAt: CreatedAt.schema()
                    })
                }
            }

            toValueObjectBody(): { latitude: number | BaseValueObject<number>; longitude: number | BaseValueObject<number>; isChecked: boolean | BaseValueObject<boolean>; createdAt: Date | BaseValueObject<Date>; } {
                return {
                    latitude: new ReceiptLatitude(this.getBody.latitude),
                    longitude: new ReceiptLongitude(this.getBody.longitude),
                    isChecked: new ReceiptIsChecked(this.getBody.isChecked),
                    createdAt: new CreatedAt(this.getBody.createdAt)
                }
            }
        }
    }

    export namespace POST {
        export class Request extends BasePayload<ReceiptPayloads.POST.Request> {
            schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    }),
                    body: z.strictObject({
                        longitude: ReceiptLongitude.schema(),
                        latitude: ReceiptLatitude.schema()
                    })
                }
            }

            toValueObjectBody() {
                return {
                    latitude: new ReceiptLatitude(this.getBody.latitude),
                    longitude: new ReceiptLongitude(this.getBody.longitude)
                }
            }
        }

        export class Response extends BasePayload<ReceiptPayloads.POST.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        id: Id.schema()
                    })
                }
            }

            toValueObjectBody() {
                return {
                    id: new Id(this.getBody.id)
                }
            }
        }
    }

    export namespace PATCH {
        export class Request extends BasePayload<ReceiptPayloads.PATCH.Request> {
            schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    }),
                    params: z.strictObject({
                        id: Id.schema()
                    }),
                    body: z.strictObject({
                        isChecked: ReceiptIsChecked.schema()
                    })
                }
            }

            toValueObjectBody() {
                return {
                    isChecked: new ReceiptIsChecked(this.getBody.isChecked)
                }
            }

            toValueObjectParams() {
                return {
                    id: new Id(this.getParams.id)
                }
            }
        }
    }

    export namespace DELETE {
        export class Request extends BasePayload<ReceiptPayloads.DELETE.Request> {
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