import BaseRoute from "../_interface";
import { SessionPayloadSchemas } from "@payload";
import { CreateLoginSessionUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { userRepository } from "@lib/repositories";
import { userPasswordHashService } from "@lib/services";
import { setCookie } from "hono/cookie";
import { TIMES } from "@lib/times";

export class CreateLoginSessionRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'post',
                path: '/session/login',
                tags: ['ログインセッションをリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 302
            },
            async (context) => {
                const body = await context.req.json()
                
                const request = new SessionPayloadSchemas.Login.POST.Request({body})
                const response = await new CreateLoginSessionUseCase(
                    { honoJwt: honoJwtLogin }, 
                    { user: userRepository },
                    { userPasswordHashService },
                ).execute(request);

                setCookie(context, 'loginSessionId', response.getCookies.loginSessionId, {
                    secure: true,
                    httpOnly: true,
                    maxAge: TIMES.loginSessionMaxAge
                })
                
                return context.redirect(process.env.FRONTEND_DOMAIN + '/dashboard')
            },
            new SessionPayloadSchemas.Login.POST.Request(),
            new SessionPayloadSchemas.Login.POST.Response()
        )
    }
}