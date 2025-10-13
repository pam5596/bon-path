import { createRoute, RouteConfig } from "@hono/zod-openapi";
import BaseRoute from "../_interface";
import { SessionPayloadSchemas } from "@payload";
import { ROUTE_DESCRIPTIONS } from "@lib/constants/routeDescriptions";
import { Handler } from "hono";
import { getCookie } from "hono/cookie";
import { RouteError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { GetVerifySessionUseCase } from "@usecase/index";
import { honoJwtVerify } from "@lib/clients";

export class GetVerifySessionRoute implements BaseRoute {
    route: RouteConfig = createRoute({
        method: 'get',
        path: '/session/verify',
        tags: ['/session/verify'],
        request: new SessionPayloadSchemas.Verify.GET.Request().schema(),
        responses: {
            200: {
                content: {
                    'application/json': {
                        schema: new SessionPayloadSchemas.Verify.GET.Response().schema().body
                    }
                },
                description: ROUTE_DESCRIPTIONS.getVerifySession
            }
        }
    })

    handler: Handler = async (context) => {
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
    }
}