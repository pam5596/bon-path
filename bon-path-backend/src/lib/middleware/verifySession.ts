import { RouteConfig } from "@hono/zod-openapi";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { PathsEnum } from "@routes/enums";
import { RouteError } from "@lib/error";
import { MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
import { verifySessionPaths } from "@routes/_verifySessionPaths";

export const verifySessionHandler: MiddlewareHandler = async (context, next) => {
    const verifySessionId = getCookie(context, 'verifySessionId');
    const path = context.req.path as PathsEnum;
    const method = context.req.method.toLowerCase() as RouteConfig['method'];

    const needSessionId = verifySessionPaths.some(
        p => p.path == path && p.method == method
    )
    if (!verifySessionId && needSessionId) 
        throw new RouteError(
            401,
            ERROR_MESSAGES.route.invalidVerifySession.detail,
            ERROR_MESSAGES.route.invalidVerifySession.issue,
            'verifySessionHandler',
            path,
            method,
            getCookie(context)
        )

    await next()
}