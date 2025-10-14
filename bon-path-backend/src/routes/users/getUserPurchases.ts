import { createRoute, RouteConfig } from "@hono/zod-openapi";
import BaseRoute from "../_interface";
import { UsersPayloadSchemas } from "@payload";
import { ROUTE_DESCRIPTIONS } from "@lib/constants/routeDescriptions";
import { Handler } from "hono";
import { getCookie } from "hono/cookie";
import { RouteError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { GetUserPurchasesUseCase } from "@usecase/users/getUserPurchases";
import { honoJwtLogin } from "@lib/clients";
import { purchaseRepository } from "@lib/repositories";

export class GetUserPurchases implements BaseRoute {
    route: RouteConfig = createRoute({
        method: 'get',
        path: '/users/purchases',
        tags: ['/users'],
        request: {
            cookies: new UsersPayloadSchemas.Purchases.GET.Request().schema().cookies
        },
        responses: {
            200: {
                content: {
                    'application/json': {
                        schema: new UsersPayloadSchemas.Purchases.GET.Response().schema().body
                    }
                },
                description: ROUTE_DESCRIPTIONS.getUserPurchases
            }
        }
    })

    handler: Handler = async(context) => {
        const loginSessionId = getCookie(context, 'loginSessionid');
        if (!loginSessionId) throw new RouteError(
            400,
            ERROR_MESSAGES.route.invalidCookie.detail,
            ERROR_MESSAGES.route.invalidCookie.issue,
            this.constructor.name,
            '/users/purchases',
            'GET',
            getCookie(context)
        )

        const request = new UsersPayloadSchemas.Purchases.GET.Request({
            cookies: { loginSessionId }
        })
        const response = await new GetUserPurchasesUseCase(
            { honoJwt: honoJwtLogin },
            { purchase: purchaseRepository },
            request
        ).execute()

        return context.json(response.getBody)
    }
}