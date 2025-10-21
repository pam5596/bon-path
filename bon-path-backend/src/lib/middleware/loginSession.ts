import { RouteConfig } from "@hono/zod-openapi";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { PathsEnum } from "@routes/enums";
import { RouteError } from "@lib/error";
import { MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
import { loginSessionPaths } from "@routes/_loginSessionPaths";

export const loginSessionHandler: MiddlewareHandler = async (context, next) => {
    const loginSessionId = getCookie(context, 'loginSessionId');
    const path = context.req.path as PathsEnum;
    const method = context.req.method.toLowerCase() as RouteConfig['method'];

    const needSessionId = loginSessionPaths.some(
        p => p.path == path && p.method == method
    )
    if (!loginSessionId && needSessionId) 
        throw new RouteError(
            401,
            ERROR_MESSAGES.route.invalidLoginSession.detail,
            ERROR_MESSAGES.route.invalidLoginSession.issue,
            'loginSessionHandler',
            path,
            method,
            getCookie(context)
        )

    await next()
}