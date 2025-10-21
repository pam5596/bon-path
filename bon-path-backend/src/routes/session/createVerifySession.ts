import BaseRoute from "../_interface";
import { SessionPayloadSchemas } from "@payload";
import { CreateVerifySessionUseCase } from "@usecase/index";
import { honoJwtVerify } from "@lib/clients";
import { setCookie } from "hono/cookie";
import { TIMES } from "@lib/constants/times";
import { userPasswordHashService } from "@lib/services";
import { userRepository } from "@lib/repositories";

export class CreateVerifySessionRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'post',
                path: '/session/verify',
                tags: ['メアド確認用セッションをリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 302
            },
            async(context) => {
                const body = await context.req.json();

                const request = new SessionPayloadSchemas.Verify.POST.Request({body})
                const response = await new CreateVerifySessionUseCase(
                    { honoJwt: honoJwtVerify },
                    { userPasswordHashService },
                    { user: userRepository }
                ).execute(request);

                setCookie(context, 'verifySessionId', response.getCookies.verifySessionId, {
                    secure: true,
                    httpOnly: true,
                    maxAge: TIMES.verifySessionMaxAge
                })

                return context.redirect(process.env.FRONTEND_DOMAIN + '/signin/email-verify')
            },
            new SessionPayloadSchemas.Verify.POST.Request(),
            new SessionPayloadSchemas.Verify.POST.Response()
        )
    }
}