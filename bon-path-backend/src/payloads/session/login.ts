import { z } from '@hono/zod-openapi';
import BasePayload from "../_abstruct";
import { SessionPayloads } from "@share/payloads/session";
import { UserEmail, UserHashId, UserPassword } from "@models/valueObject";

export namespace LoginSchemas {
    export namespace GET {
        export class Request extends BasePayload<SessionPayloads.Login.GET.Request> {
            schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    })
                }
            }
        }

        export class Response extends BasePayload<SessionPayloads.Login.GET.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        userHashId: UserHashId.schema(),
                    })
                }
            }

            toValueObjectBody() {
                return {
                    userHashId: new UserHashId(this.getBody.userHashId)
                }
            }
        }
    }

    export namespace POST {
        export class Request extends BasePayload<SessionPayloads.Login.POST.Request> {
            schema() {
                return {
                    body: z.strictObject({
                        email: UserEmail.schema(),
                        password: UserPassword.schema()
                    })
                }
            }

            toValueObjectBody() {
                return {
                    email: new UserEmail(this.getBody.email),
                    password: new UserPassword(this.getBody.password)
                }
            }
        }

        export class Response extends BasePayload<SessionPayloads.Login.POST.Response> {
            schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    })
                }
            }
        }
    }

    export namespace DELETE {
        export class Request extends BasePayload<SessionPayloads.Login.DELETE.Request> {
            schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    })
                }
            }
        }
    }
}