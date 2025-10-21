import BaseRoute from "../_interface"
import { SessionPayloadSchemas } from "@payload"
import { getCookie } from "hono/cookie"
import { GetLoginSessionUseCase } from "@usecase/index"
import { honoJwtLogin } from "@lib/clients"

export class GetLoginSessionRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/session/login',
                tags: ['ログインセッションをリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async (context) => {
                const loginSessionId = getCookie(context, 'loginSessionId') as string;

                const request = new SessionPayloadSchemas.Login.GET.Request({
                    cookies: { loginSessionId }
                });
                const response = await new GetLoginSessionUseCase({
                    honoJwt: honoJwtLogin
                }).execute(request)

                return context.json(response.getBody)
            },
            new SessionPayloadSchemas.Login.GET.Request(),
            new SessionPayloadSchemas.Login.GET.Response()
        )
    }
}