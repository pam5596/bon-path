import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { SessionPayloads } from "@share/payloads"
import { UserEmail, UserHashPassword, UserName, UserPassword } from "@models/valueObject";

export namespace VerifySchemas {
    export namespace GET {
        export class Request extends BasePayload<SessionPayloads.Verify.GET.Request> {
            schema() {
                return {
                    cookies: z.strictObject({
                        verifySessionId: z.string()
                    })
                }
            }
        }

        export class Response extends BasePayload<SessionPayloads.Verify.GET.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        userName: UserName.schema(),
                        userEmail: UserEmail.schema(),
                        userHashPassword: UserHashPassword.schema()
                    })
                }
            }

            toValueObjectBody() {
                return {
                    userName: new UserName(this.getBody.userName),
                    userEmail: new UserEmail(this.getBody.userEmail),
                    userHashPassword: new UserHashPassword(this.getBody.userHashPassword)
                }
            }
        }
    }

    export namespace POST {
        export class Request extends BasePayload<SessionPayloads.Verify.POST.Request> {
            schema() {
                return {
                    body: z.strictObject({
                        name: UserName.schema(),
                        email: UserEmail.schema(),
                        password: UserPassword.schema()
                    })
                }
            }

            
            toValueObjectBody() {
                return {
                    name: new UserName(this.getBody.name),
                    email: new UserEmail(this.getBody.email),
                    password: new UserPassword(this.getBody.password)
                }
            }
        }

        export class Response extends BasePayload<SessionPayloads.Verify.POST.Response> {
            schema() {
                return {
                    cookies: z.strictObject({
                        verifySessionId: z.string()
                    })
                }
            }
        }
    }
}