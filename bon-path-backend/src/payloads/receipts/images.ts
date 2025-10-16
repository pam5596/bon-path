import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { ReceiptPayloads } from "@share/payloads";
import { CreatedAt, Id, ReceiptImageUrl } from "@models/valueObject";

export namespace ImagesSchemas {
    export namespace GET {
        export class Request extends BasePayload<ReceiptPayloads.Images.GET.Request> {
            schema() {
                return {
                    params: z.strictObject({
                        receiptId: Id.paramSchema()
                    })
                }
            }

            toValueObjectParams() {
                return {
                    receiptId: new Id(this.getParams.receiptId)
                }
            }
        }

        export class Response extends BasePayload<ReceiptPayloads.Images.GET.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        images: z.array(
                            z.strictObject({
                                id: Id.paramSchema(),
                                url: ReceiptImageUrl.schema(),
                                createdAt: CreatedAt.schema()
                            })
                        )
                    })
                }
            }


            toValueObjectBody() {
                return {
                    images: this.getBody.images.map(
                        (image) => ({
                            id: new Id(image.id),
                            url: new ReceiptImageUrl(image.url),
                            createdAt: new CreatedAt(image.createdAt)
                        })
                    )
                }
            }
        }
    }
}