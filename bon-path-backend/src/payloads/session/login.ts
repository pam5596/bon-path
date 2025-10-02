import { z } from '@hono/zod-openapi';
import BasePayload from "../_abstruct";
import { SessionPayloads } from "@share/payloads/session";
import { UserEmail, UserHashId, UserPassword } from "@models/valueObject";

export namespace Login {
    export namespace GET {
        export class Request extends BasePayload<SessionPayloads.Login.GET.Request> {
            static schema() {
                return {
                    cookies: z.object({
                        loginSessionId: z.string()
                    })
                }
            }
        }

        export class Response extends BasePayload<SessionPayloads.Login.GET.Response> {
            static schema() {
                return {
                    body: z.object({
                        userHashId: UserHashId.schema(),
                        expiresAt: z.iso.datetime()
                    })
                }
            }

            toValueObjects() {
                return {
                    body: {
                        userHashId: new UserHashId(this._values.body.userHashId),
                        expiresAt: new Date(this._values.body.expiresAt)
                    }
                }
            }
        }
    }

    export namespace POST {
        export class Request extends BasePayload<SessionPayloads.Login.POST.Request> {
            static schema() {
                return {
                    body: z.object({
                        email: UserEmail.schema(),
                        password: UserPassword.schema()
                    })
                }
            }

            toValueObjects() {
                return {
                    body: {
                        email: new UserEmail(this._values.body.email),
                        password: new UserPassword(this._values.body.password)
                    }
                }
            }
        }

        export class Response extends BasePayload<SessionPayloads.Login.POST.Response> {
            static schema() {
                return {
                    headers: z.object({
                        Location: z.url()
                    }),
                    cookies: z.object({
                        loginSessionId: z.string()
                    })
                }
            }
        }
    }

    export namespace DELETE {
        export class Request extends BasePayload<SessionPayloads.Login.DELETE.Request> {
            static schema() {
                return {
                    cookies: z.object({
                        loginSessionId: z.string()
                    })
                }
            }
        }

        export class Response extends BasePayload<SessionPayloads.Login.DELETE.Response> {
            static schema() {
                return {
                    headers: z.object({
                        Location: z.url()
                    })
                }
            }
        }
    }
}