import { createRoute, RouteConfig } from "@hono/zod-openapi";
import BaseRoute from "../_interface";
import { SessionPayloadSchemas, UsersPayloadSchemas } from "@payload";
import { ROUTE_DESCRIPTIONS } from "@lib/constants/routeDescriptions";
;
import { UserPayloads } from "@share/payloads";
import { getCookie } from "hono/cookie";
import { RouteError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { CreateUserUseCase } from "@usecase/index";
import { honoJwtVerify } from "@lib/clients";
import { userRepository } from "@lib/repositories";
import { userPasswordHashService } from "@lib/services";

export class CreateUserRoute implements BaseRoute {    
    route = createRoute({
        method: 'post',
        path: '/users',
        tags: ['/users'],
        request: {
            cookies: new UsersPayloadSchemas.POST.Request().schema().cookies,
            body: {
                content: {
                    'application/json': {
                        schema:  new UsersPayloadSchemas.POST.Request().schema().body
                    }
                }
            }
        },
        responses: {
            201: {
                content: {
                    'application/json': {
                        schema: new UsersPayloadSchemas.POST.Response().schema().body
                    }
                },
                description: ROUTE_DESCRIPTIONS.createUser
            }
        }
    })

    handler = async (context) => {
        const body = await context.req.json() as UserPayloads.POST.Request['body']
        const verifySessionId = getCookie(context, 'loginSessionId');

        if (!verifySessionId) throw new RouteError(
            400,
            ERROR_MESSAGES.route.invalidCookie.detail,
            ERROR_MESSAGES.route.invalidCookie.issue,
            this.constructor.name,
            '/users',
            'POST',
            getCookie(context)
        )

        const request = new UsersPayloadSchemas.POST.Request({
            cookies: { verifySessionId }, body
        });
        const response = await new CreateUserUseCase(
            { honoJwt: honoJwtVerify },
            { user: userRepository },
            { userPasswordHashService },
            request
        ).execute();

        return context.json(response.getBody)
    }
}