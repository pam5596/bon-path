import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { ReceiptImagePayloads } from "@share/payloads";
import { Id } from "@models/valueObject";

export namespace ReceiptImagesPayloadSchemas {
    export namespace POST {
        export class Request extends BasePayload<ReceiptImagePayloads.POST.Request> {
            schema() {
                return {
                    body: z.strictObject({
                        receiptId: Id.paramSchema(),
                        images: z.array(z.any())
                    })
                }
            }

            toValueObjectBody() {
                return {
                    receiptId: new Id(this.getBody.receiptId),
                    images: this.getBody.images
                }
            }
        }
    }

    export namespace DELETE {
        export class Request extends BasePayload<ReceiptImagePayloads.DELETE.Request> {
            schema() {
                return {
                    params: z.strictObject({
                        id: Id.paramSchema()
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