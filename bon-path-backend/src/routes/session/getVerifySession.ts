import BaseRoute from "../_interface";
import { SessionPayloadSchemas } from "@payload";
import { getCookie } from "hono/cookie";
import { RouteError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { GetVerifySessionUseCase } from "@usecase/index";
import { honoJwtVerify } from "@lib/clients";

export class GetVerifySessionRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/session/verify',
                tags: ['メアド確認用セッションをリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async (context) => {
                const verifySessionId = getCookie(context, 'verifySessionId');
                if (!verifySessionId) throw new RouteError(
                    400,
                    ERROR_MESSAGES.route.invalidCookie.detail,
                    ERROR_MESSAGES.route.invalidCookie.issue,
                    this.constructor.name,
                    '/session/verify',
                    'GET',
                    getCookie(context)
                )

                const request = new SessionPayloadSchemas.Verify.GET.Request({
                    cookies: { verifySessionId }
                });
                const response = await new GetVerifySessionUseCase({
                    honoJwt: honoJwtVerify
                }, request).execute()

                return context.json(response.getBody)
            },
            new SessionPayloadSchemas.Verify.GET.Request(),
            new SessionPayloadSchemas.Verify.GET.Response()
        )
    }
}