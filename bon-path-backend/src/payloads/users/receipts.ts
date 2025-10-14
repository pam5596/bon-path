import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { UserPayloads } from "@share/payloads";
import { CreatedAt, Id, ReceiptIsChecked, ReceiptLatitude, ReceiptLongitude } from "@models/valueObject";

export namespace ReceiptsSchemas {
    export namespace GET {
        export class Request extends BasePayload<UserPayloads.Receipts.GET.Request> {
            schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    }),
                    query: z.strictObject({
                        isChecked: z.stringbool({
                            truthy: ['true'],
                            falsy: ['false']
                        }).optional()
                    })
                }
            }

            toValueObjectQuery() {
                return {
                    isChecked: this.getQuery.isChecked ? new ReceiptIsChecked(this.getQuery.isChecked) : undefined
                }
            }
        }

        export class Response extends BasePayload<UserPayloads.Receipts.GET.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        receipts: z.array(
                            z.strictObject({
                                id: Id.schema(),
                                latitude: ReceiptLatitude.schema(),
                                longitude: ReceiptLongitude.schema(),
                                isChecked: ReceiptIsChecked.schema(),
                                createdAt: CreatedAt.schema()
                            })
                        )
                    })
                }
            }

            toValueObjectBody() {
                return {
                    receipts: this.getBody.receipts.map(
                        (receipt) => ({
                            id: new Id(receipt.id),
                            latitude: new ReceiptLatitude(receipt.latitude),
                            longitude: new ReceiptLongitude(receipt.longitude),
                            isChecked: new ReceiptIsChecked(receipt.isChecked),
                            createdAt: new CreatedAt(receipt.createdAt)
                        })
                    )
                }
            }
        }
    }
}