import { createRoute, RouteConfig } from "@hono/zod-openapi";
import BaseRoute from "../_interface";
import { SessionPayloadSchemas } from "@payload";
import { ROUTE_DESCRIPTIONS } from "@lib/constants/routeDescriptions";
import { Handler } from "hono";
import { deleteCookie } from "hono/cookie";

export class DeleteLoginSessionRoute implements BaseRoute {
    route: RouteConfig = createRoute({
        method: 'delete',
        path: '/session/login',
        tags: ['/session/login'],
        request: new SessionPayloadSchemas.Login.DELETE.Request().schema(),
        responses: {
            302: {
                description: ROUTE_DESCRIPTIONS.deleteLoginSession
            }
        }
    })

    handler: Handler = (context) => {
        deleteCookie(context, 'loginSessionId')
        return context.redirect(process.env.FRONTEND_DOMAIN + '/signup')
    }
}