import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { UserPayloads } from "@share/payloads";
import { CreatedAt, Id, ReceiptIsChecked, ReceiptLatitude, ReceiptLongitude } from "@models/valueObject";

export namespace ReceiptsSchemas {
    export namespace GET {
        export class Request extends BasePayload<UserPayloads.Receipts.GET.Request> {
            static schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    }),
                    query: z.strictObject({
                        isChecked: ReceiptIsChecked.schema().optional()
                    })
                }
            }

            public toValueObjects() {
                return {
                    ...this._values,
                    query: {
                        isChecked: this._values.query.isChecked ? 
                            new ReceiptIsChecked(this._values.query.isChecked) : 
                            undefined
                    }
                }
            }
        }

        export class Response extends BasePayload<UserPayloads.Receipts.GET.Response> {
            static schema() {
                return {
                    body: z.strictObject({
                        receipts: z.array(
                            z.strictObject({
                                id: Id.schema(),
                                latitude: ReceiptLatitude.schema(),
                                longitude: ReceiptLongitude.schema(),
                                createdAt: CreatedAt.schema()
                            })
                        )
                    })
                }
            }

            public toValueObjects() {
                return {
                    body: {
                        purchases: this._values.body.receipts.map(
                            (receipt) => ({
                                id: new Id(receipt.id),
                                latitude: new ReceiptLatitude(receipt.latitude),
                                longitude: new ReceiptLongitude(receipt.longitude),
                                createdAt: new CreatedAt(receipt.createdAt)
                            })
                        )
                    }
                }
            }
        }
    }
}