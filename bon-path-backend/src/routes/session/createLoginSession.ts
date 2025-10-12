import { createRoute, RouteConfig } from "@hono/zod-openapi";
import BaseRoute from "../_interface";
import { SessionPayloadSchemas } from "@payload";
import { Handler } from "hono";
import { SessionPayloads } from "@share/payloads";
import { ROUTE_DESCRIPTIONS } from "@lib/constants/routeDescriptions";
import { CreateLoginSessionUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { userRepository } from "@lib/repositories";
import { userPasswordHashService } from "@lib/services";
import { setCookie } from "hono/cookie";

export class CreateLoginSessionRoute implements BaseRoute {
    route: RouteConfig = createRoute({
        method: 'post',
        path: '/session/login',
        tags: ['/session/login'],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: new SessionPayloadSchemas.Login.POST.Request().schema().body
                    }
                }
            }
        },
        responses: {
            302: {
                description: ROUTE_DESCRIPTIONS.createLoginSession
            }
        }
    })

    handler: Handler = async (context) => {
        const body = await context.req.json() as SessionPayloads.Login.POST.Request['body']
        
        const request = new SessionPayloadSchemas.Login.POST.Request({body})
        const response = await new CreateLoginSessionUseCase(
            { honoJwt: honoJwtLogin }, 
            { user: userRepository },
            { userPasswordHashService },
            request
        ).execute();

        setCookie(context, 'loginSessionId', response.getCookies.loginSessionId, {
            secure: true,
            httpOnly: true,
            maxAge: 60
        })
        
        return context.redirect(process.env.FRONTEND_DOMAIN + '/dashboard')
    }
}