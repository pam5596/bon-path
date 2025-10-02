import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { SessionPayloads } from "@share/payloads"
import { UserEmail, UserHashPassword, UserName, UserPassword } from "@models/valueObject";

export namespace VerifySchemas {
    export namespace GET {
        export class Request extends BasePayload<SessionPayloads.Verify.GET.Request> {
            static schema() {
                return {
                    cookies: z.strictObject({
                        verifySessionId: z.string()
                    })
                }
            }
        }

        export class Response extends BasePayload<SessionPayloads.Verify.GET.Response> {
            static schema() {
                return {
                    body: z.strictObject({
                        userName: UserName.schema(),
                        userEmail: UserEmail.schema(),
                        userHashPassword: UserHashPassword.schema()
                    })
                }
            }

            toValueObjects(){
                return {
                    body: {
                        userName: new UserName(this._values.body.userName),
                        userEmail: new UserEmail(this._values.body.userEmail),
                        userHashPassword: new UserHashPassword(this._values.body.userHashPassword)
                    }
                }
            }
        }
    }

    export namespace POST {
        export class Request extends BasePayload<SessionPayloads.Verify.POST.Request> {
            static schema() {
                return {
                    body: z.strictObject({
                        name: UserName.schema(),
                        email: UserEmail.schema(),
                        password: UserPassword.schema()
                    })
                }
            }

            public toValueObjects() {
                return {
                    body: {
                        name: new UserName(this._values.body.name),
                        email: new UserEmail(this._values.body.email),
                        password: new UserPassword(this._values.body.password)
                    }
                }
            }
        }

        export class Response extends BasePayload<SessionPayloads.Verify.POST.Response> {
            static schema() {
                return {
                    headers: z.strictObject({
                        Location: z.url()
                    }),
                    cookies: z.strictObject({
                        verifySessionId: z.string()
                    })
                }
            }
        }
    }
}