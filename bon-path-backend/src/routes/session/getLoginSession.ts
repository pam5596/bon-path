import { createRoute, RouteConfig } from "@hono/zod-openapi"
import BaseRoute from "../_interface"
import { SessionPayloadSchemas } from "@payload"
import { ROUTE_DESCRIPTIONS } from "@lib/constants/routeDescriptions"
import { Handler } from "hono"
import { getCookie } from "hono/cookie"
import { RouteError } from "@lib/error"
import { ERROR_MESSAGES } from "@lib/constants/errorMessages"
import { GetLoginSessionUseCase } from "@usecase/index"
import { honoJwtLogin } from "@lib/clients"

export class GetLoginSessionRoute implements BaseRoute {
    route: RouteConfig = createRoute({
        method: 'get',
        path: '/session/login',
        tags: ['/session/login'],
        request: new SessionPayloadSchemas.Login.GET.Request().schema(),
        responses: {
            200: {
                content: {
                    'application/json': {
                        schema: new SessionPayloadSchemas.Login.GET.Response().schema().body,
                    },
                },
                description: ROUTE_DESCRIPTIONS.getLoginSession
            },
        }
    })

    handler: Handler = async (context) => {
        const loginSessionId = getCookie(context, 'loginSessionId');
        if (!loginSessionId) throw new RouteError(
            401,
            ERROR_MESSAGES.route.invalidCookie.detail,
            ERROR_MESSAGES.route.invalidCookie.issue,
            this.constructor.name,
            '/session/login',
            'GET',
            getCookie(context)
        )

        const request = new SessionPayloadSchemas.Login.GET.Request({
            cookies: { loginSessionId }
        });
        const response = await new GetLoginSessionUseCase({
            honoJwt: honoJwtLogin
        }, request).execute()

        return context.json(response.getBody)
    }
}