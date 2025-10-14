import { createRoute, RouteConfig } from "@hono/zod-openapi";
import BaseRoute from "../_interface";
import { UsersPayloadSchemas } from "@payload";
import { ROUTE_DESCRIPTIONS } from "@lib/constants/routeDescriptions";
import { Handler } from "hono";
import { getCookie } from "hono/cookie";
import { RouteError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { GetUserReceiptsUseCase } from "@usecase/users/getUserReceipts";
import { honoJwtLogin } from "@lib/clients";
import { receiptRepository } from "@lib/repositories";

export class GetUserReceiptsRoute implements BaseRoute {
    route: RouteConfig = createRoute({
        method: 'get',
        path: '/users/receipts',
        tags: ['/users'],
        request: {
            cookies: new UsersPayloadSchemas.Receipts.GET.Request().schema().cookies,
            query: new UsersPayloadSchemas.Receipts.GET.Request().schema().query
        },
        responses: {
            200: {
                content: {
                    'application/json': {
                        schema: new UsersPayloadSchemas.Receipts.GET.Response().schema().body
                    }
                },
                description: ROUTE_DESCRIPTIONS.getUserReceipts
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
            '/users/receipts',
            'GET',
            getCookie(context)
        )

        const { isChecked } = new UsersPayloadSchemas.Receipts.GET.Request()
            .schema().query.parse(context.req.query())

        const request = new UsersPayloadSchemas.Receipts.GET.Request({
            cookies: { loginSessionId },
            query: { isChecked }
        })
        const response = await new GetUserReceiptsUseCase(
            { honoJwt: honoJwtLogin },
            { receipt: receiptRepository },
            request
        ).execute()

        return context.json(response.getBody)
    }
}