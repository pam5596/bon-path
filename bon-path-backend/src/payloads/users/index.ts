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
            static schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    })
                }
            }
        }

        export class Response extends BasePayload<UserPayloads.GET.Response> {
            static schema() {
                return {
                    body: z.strictObject({
                        name: UserName.schema(),
                        email: UserEmail.schema(),
                        createdAt: CreatedAt.schema()
                    })
                }
            }

            public toValueObjects() {
                return {
                    body: {
                        name: new UserName(this._values.body.name),
                        email: new UserEmail(this._values.body.email),
                        createdAt: new CreatedAt(this._values.body.createdAt)
                    }
                }
            }
        }
    }

    export namespace POST {
        export class Request extends BasePayload<UserPayloads.POST.Request> {
            static schema() {
                return {
                    cookies: z.strictObject({
                        verifySessionId: z.string()
                    }),
                    body: z.strictObject({
                        name: UserName.schema(),
                        email: UserEmail.schema(),
                        password: UserPassword.schema()
                    })
                }
            }

            public toValueObjects() {
                return {
                    ...this._values,
                    body: {
                        name: new UserName(this._values.body.name),
                        email: new UserEmail(this._values.body.email),
                        password: new UserPassword(this._values.body.password)
                    }
                }
            }
        }

        export class Response extends BasePayload<UserPayloads.POST.Response> {
            static schema() {
                return {
                    body: z.strictObject({
                        hashedId: UserHashId.schema()
                    })
                }
            }

            public toValueObjects() {
                return {
                    body: {
                        hashId: new UserHashId(this._values.body.hashedId)
                    }
                }
            }
        }
    }

    export namespace PATCH {
        export class Request extends BasePayload<UserPayloads.PATCH.Request> {
            static schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    }),
                    body: z.strictObject({
                        name: UserName.schema(),
                        email: UserEmail.schema()
                    })
                }
            }

            public toValueObjects() {
                return {
                    ...this._values,
                    body: {
                        name: new UserName(this._values.body.name),
                        email: new UserEmail(this._values.body.email)
                    }
                }
            }
        }
    }

    export namespace DELETE {
        export class Request extends BasePayload<UserPayloads.DELETE.Request> {
            static schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    })
                }
            }
        }
    }
}