import { createRoute, RouteConfig } from "@hono/zod-openapi";
import BaseRoute from "../_interface";
import { UsersPayloadSchemas } from "@payload";
import { ROUTE_DESCRIPTIONS } from "@lib/constants/routeDescriptions";
import { Handler } from "hono";
import { getCookie } from "hono/cookie";
import { RouteError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { GetUserUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { userRepository } from "@lib/repositories";

export class GetUserRoute implements BaseRoute {
    route: RouteConfig = createRoute({
        method: 'get',
        path: '/users',
        tags: ['/users'],
        request: {
            cookies: new UsersPayloadSchemas.GET.Request().schema().cookies
        },
        responses: {
            200: {
                content: {
                    'application/json': {
                        schema: new UsersPayloadSchemas.GET.Response().schema().body
                    }
                },
                description: ROUTE_DESCRIPTIONS.getUser
            }
        }
    });

    handler: Handler = async (context) => {
        const loginSessionId = getCookie(context, 'loginSessionid');
        if (!loginSessionId) throw new RouteError(
            400,
            ERROR_MESSAGES.route.invalidCookie.detail,
            ERROR_MESSAGES.route.invalidCookie.issue,
            this.constructor.name,
            '/users',
            'GET',
            getCookie(context)
        )

        const request = new UsersPayloadSchemas.GET.Request({
            cookies: { loginSessionId }
        })
        const response = await new GetUserUseCase(
            { honoJwt: honoJwtLogin },
            { user: userRepository },
            request
        ).execute()

        return context.json(response.getBody)
    }
}