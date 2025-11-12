import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { UserPayloads } from "@share/payloads";
import { CreatedAt, UserEmail, UserHashId, UserName, UserPassword } from "@models/valueObject";
import { PurchasesSchemas } from "./purchases";
import { ReceiptsSchemas } from "./receipts";

export namespace UsersPayloadSchemas {
    export import Purchases = PurchasesSchemas;
    export import Receipts = ReceiptsSchemas;

    export namespace GET {
        export class Request extends BasePayload<UserPayloads.GET.Request> {
            schema() {
                return {
                    cookies: z.object({
                        loginSessionId: z.string()
                    })
                }
            }
        }

        export class Response extends BasePayload<UserPayloads.GET.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        name: UserName.schema(),
                        email: UserEmail.schema(),
                        createdAt: CreatedAt.schema()
                    })
                }
            }

            toValueObjectBody() {
                return {
                    name: new UserName(this.getBody.name),
                    email: new UserEmail(this.getBody.email),
                    createdAt: new CreatedAt(this.getBody.createdAt)
                }
            }
        }
    }

    export namespace POST {
        export class Request extends BasePayload<UserPayloads.POST.Request> {
            schema() {
                return {
                    cookies: z.object({
                        verifySessionId: z.string()
                    })
                }
            }
        }

        export class Response extends BasePayload<UserPayloads.POST.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        hashedId: UserHashId.schema()
                    })
                }
            }

            toValueObjectBody() {
                return {
                    hashedId: new UserHashId(this.getBody.hashedId)
                }
            }
        }
    }

    export namespace PATCH {
        export class Request extends BasePayload<UserPayloads.PATCH.Request> {
            schema() {
                return {
                    cookies: z.object({
                        loginSessionId: z.string()
                    }),
                    body: z.strictObject({
                        name: UserName.schema(),
                        email: UserEmail.schema()
                    })
                }
            }

            toValueObjectBody() {
                return {
                    name: new UserName(this.getBody.name),
                    email: new UserEmail(this.getBody.email)
                }
            }
        }
    }

    export namespace DELETE {
        export class Request extends BasePayload<UserPayloads.DELETE.Request> {
            schema() {
                return {
                    cookies: z.object({
                        loginSessionId: z.string()
                    })
                }
            }
        }
    }
}