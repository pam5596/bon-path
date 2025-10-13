import { createRoute, RouteConfig } from "@hono/zod-openapi";
import BaseRoute from "../_interface";
import { SessionPayloadSchemas } from "@payload";
import { ROUTE_DESCRIPTIONS } from "@lib/constants/routeDescriptions";
import { Handler } from "hono";
import { SessionPayloads } from "@share/payloads";
import { CreateVerifySessionUseCase } from "@usecase/index";
import { honoJwtVerify } from "@lib/clients";
import { setCookie } from "hono/cookie";

export class CreateVerifySessionRoute implements BaseRoute {
    route: RouteConfig = createRoute({
        method: 'post',
        path: '/session/verify',
        tags: ['/session/verify'],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: new SessionPayloadSchemas.Verify.POST.Request().schema().body
                    }
                }
            }
        },
        responses: {
            302: {
                description: ROUTE_DESCRIPTIONS.createVerifySession
            }
        }
    })

    handler: Handler = async(context) => {
        const body = await context.req.json() as SessionPayloads.Verify.POST.Request['body'];

        const request = new SessionPayloadSchemas.Verify.POST.Request({body})
        const response = await new CreateVerifySessionUseCase(
            { honoJwt: honoJwtVerify },
            request
        ).execute();

        setCookie(context, 'verifySessionId', response.getCookies.verifySessionId, {
            secure: true,
            httpOnly: true,
            maxAge: 60
        })

        return context.redirect(process.env.FRONTEND_DOMAIN + '/signin/email-verify')
    }
}