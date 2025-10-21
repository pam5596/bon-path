import BaseRoute from "../_interface";
import { SessionPayloadSchemas } from "@payload";
import { getCookie } from "hono/cookie";
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
                const verifySessionId = getCookie(context, 'verifySessionId') as string;

                const request = new SessionPayloadSchemas.Verify.GET.Request({
                    cookies: { verifySessionId }
                });
                const response = await new GetVerifySessionUseCase({
                    honoJwt: honoJwtVerify
                }).execute(request)

                return context.json(response.getBody)
            },
            new SessionPayloadSchemas.Verify.GET.Request(),
            new SessionPayloadSchemas.Verify.GET.Response()
        )
    }
}