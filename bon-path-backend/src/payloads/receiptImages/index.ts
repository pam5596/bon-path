import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { ReceiptImagePayloads } from "@share/payloads";
import { Id } from "@models/valueObject";

export namespace ReceiptImagesPayloadSchemas {
    export namespace POST {
        export class Request extends BasePayload<ReceiptImagePayloads.POST.Request> {
            schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    }),
                    body: z.strictObject({
                        receiptId: Id.schema(),
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
            schema(): { body?: z.ZodObject<{}, z.core.$strict> | undefined; params?: z.ZodObject<{ id: z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>; }, z.core.$strict> | undefined; query?: z.ZodObject<{}, z.core.$strict> | undefined; cookies?: z.ZodObject<{ loginSessionId: z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>; }, z.core.$strict> | undefined; headers?: z.ZodObject<{}, z.core.$strict> | undefined; } {
                return {
                    cookies: z.object({
                        loginSessionId: z.string()
                    }),
                    params: z.object({
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