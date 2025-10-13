import { createRoute, RouteConfig } from "@hono/zod-openapi";
import BaseRoute from "../_interface";
import { UsersPayloadSchemas } from "@payload";
import { ROUTE_DESCRIPTIONS } from "@lib/constants/routeDescriptions";
import { Handler } from "hono";
import { getCookie } from "hono/cookie";
import { RouteError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { UpdateUserUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { userPasswordHashService } from "@lib/services";
import { userRepository } from "@lib/repositories";

export class UpdateUserRoute implements BaseRoute {
    route: RouteConfig = createRoute({
        method: 'patch',
        path: '/users',
        tags: ['/users'],
        request: {
            cookies: new UsersPayloadSchemas.PATCH.Request().schema().cookies,
            body: {
                content: {
                    'application/json': {
                        schema: new UsersPayloadSchemas.PATCH.Request().schema().body
                    }
                }
            }
        },
        responses: {
            204: {
                description: ROUTE_DESCRIPTIONS.updateUser
            }
        }
    })

    handler: Handler = async(context) => {
        const body = await context.req.json()
        const loginSessionId = getCookie(context, 'loginSessionId');

        if (!loginSessionId) throw new RouteError(
            400,
            ERROR_MESSAGES.route.invalidCookie.detail,
            ERROR_MESSAGES.route.invalidCookie.issue,
            this.constructor.name,
            '/users',
            'PATCH',
            getCookie(context)
        )

        const request = new UsersPayloadSchemas.PATCH.Request({
            cookies: { loginSessionId },
            body
        })

        await new UpdateUserUseCase(
            { honoJwt: honoJwtLogin },
            { user: userRepository },
            { userPasswordHash: userPasswordHashService },
            request
        ).execute()
    }
}