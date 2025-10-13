import { createRoute, RouteConfig } from "@hono/zod-openapi";
import BaseRoute from "../_interface";
import { UsersPayloadSchemas } from "@payload";
import { ROUTE_DESCRIPTIONS } from "@lib/constants/routeDescriptions";
import { Handler } from "hono";
import { getCookie } from "hono/cookie";
import { RouteError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { DeleteUserUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { userRepository } from "@lib/repositories";

export class DeleteUserRoute implements BaseRoute {
    route: RouteConfig = createRoute({
        method: 'delete',
        path: '/users',
        tags: ['/users'],
        request: {
            cookies: new UsersPayloadSchemas.DELETE.Request().schema().cookies
        },
        responses: {
            204: {
                description: ROUTE_DESCRIPTIONS.deleteLoginSession
            }
        }
    })

    handler: Handler = async(context) => {
        const loginSessionId = getCookie(context, 'loginSessionId');
        if (!loginSessionId) throw new RouteError(
            400,
            ERROR_MESSAGES.route.invalidCookie.detail,
            ERROR_MESSAGES.route.invalidCookie.issue,
            this.constructor.name,
            '/users',
            'DELETE',
            getCookie(context)
        )

        const request = new UsersPayloadSchemas.DELETE.Request({
            cookies: { loginSessionId }
        })
        await new DeleteUserUseCase(
            { honoJwt: honoJwtLogin },
            { user: userRepository },
            request
        ).execute()
    }
}