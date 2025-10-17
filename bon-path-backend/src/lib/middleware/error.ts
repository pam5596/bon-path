import { logger } from "@lib/clients";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import BaseError from "@lib/error/_abstruct";
import { ErrorHandler } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";

export const errorHandler: ErrorHandler = async (error, context) => {
    let response;

    if (error instanceof BaseError) {
        response = {
            code: error.code,
            detail: error.detail,
            issue: error.issue,
            stack: error.stack,
            instance: error.instance,
            report: error.report
        }
    } else {
        response = {
            code: 500,
            detail: ERROR_MESSAGES.route.unknown,
            issue: error.message,
            stack: error.stack,
            instance: error.name,
            report: {
                body: context.req.parseBody(),
                params: context.req.param(),
                query: context.req.query(),
                headers: context.req.header()
            }
        }
    }

    logger.error(response)
    return context.json(response, response.code as ContentfulStatusCode)
}