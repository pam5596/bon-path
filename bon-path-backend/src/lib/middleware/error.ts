import { logger } from "@lib/clients";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import BaseError from "@lib/error/_abstruct";
import { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { ContentfulStatusCode } from "hono/utils/http-status";

export const errorHandler: ErrorHandler = async (error, context) => {
    let response;

    if (error instanceof BaseError) {
        response = {
            code: error.code,
            path: context.res.url,
            detail: error.detail,
            issue: error.issue,
            stack: error.stack,
            instance: error.instance,
            report: error.report
        }
    } else {
        response = {
            code: error instanceof HTTPException ? error.status : 500,
            path: context.res.url,
            detail: ERROR_MESSAGES.route.unknown,
            issue: error.message,
            stack: error.stack,
            instance: error.name,
            report: {
                body: await context.req.json(),
                params: context.req.param(),
                query: context.req.query(),
                headers: context.req.header()
            }
        }
    }

    logger.error(response)
    return context.json(response, response.code as ContentfulStatusCode)
}