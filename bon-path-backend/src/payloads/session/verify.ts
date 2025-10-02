import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { SessionPayloads } from "@share/payloads"
import { UserEmail, UserHashPassword, UserName, UserPassword } from "@models/valueObject";

export namespace Verify {
    export namespace GET {
        export class Request extends BasePayload<SessionPayloads.Verify.GET.Request> {
            static schema() {
                return {
                    cookies: z.object({
                        verifySessionId: z.string()
                    })
                }
            }
        }

        export class Response extends BasePayload<SessionPayloads.Verify.GET.Response> {
            static schema() {
                return {
                    body: z.object({
                        userName: UserName.schema(),
                        userEmail: UserEmail.schema(),
                        userHashPassword: UserHashPassword.schema()
                    })
                }
            }
        }
    }

    export namespace POST {
        export class Request extends BasePayload<SessionPayloads.Verify.POST.Request> {
            static schema() {
                return {
                    body: z.object({
                        name: UserName.schema(),
                        email: UserEmail.schema(),
                        password: UserPassword.schema()
                    })
                }
            }
        }

        export class Response extends BasePayload<SessionPayloads.Verify.POST.Response> {
            static schema() {
                return {
                    headers: z.object({
                        Location: z.url()
                    }),
                    cookies: z.object({
                        verifySessionId: z.string()
                    })
                }
            }
        }
    }
}