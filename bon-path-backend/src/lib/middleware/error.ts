import BaseError from "@lib/error/_abstruct";
import { MiddlewareHandler } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";

export const errorHandler: MiddlewareHandler = async (context, next) => {
    try {
        return await next()
    } catch (e) {
        if (e instanceof BaseError) {
            return context.json({
                code: e.code,
                detail: e.detail,
                issue: e.issue,
                stack: e.stack,
                instance: e.instance,
                report: e.report
            }, e.code as ContentfulStatusCode)
        } else {
            throw e
        }
    }
}