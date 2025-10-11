import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import BaseError from "@lib/error/_abstruct";
import { ErrorHandler } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";

export const errorHandler: ErrorHandler = async (error, context) => {
    if (error instanceof BaseError) {
        return context.json({
            code: error.code,
            detail: error.detail,
            issue: error.issue,
            stack: error.stack,
            instance: error.instance,
            report: error.report
        }, error.code as ContentfulStatusCode)
    } else {
        return context.json({
            code: 500,
            detail: ERROR_MESSAGES.route.unknown,
            issue: error.message,
            stack: error.stack,
            instance: error.name,
            report: context
        }, 500)
    }
}