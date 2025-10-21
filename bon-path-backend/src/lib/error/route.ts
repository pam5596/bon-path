import { PathsEnum } from "@lib/enums";
import BaseError from "./_abstruct";
import { RouteConfig } from "@hono/zod-openapi";

export default class RouteError extends BaseError {
    constructor(
        code: number,
        detail: string,
        issue: string,
        instance: string,
        route: PathsEnum,
        method: RouteConfig['method'],
        report: unknown
    ) {
        super(
            code, detail, issue, `[${instance}] ${method.toUpperCase()}: ${route}`, report);
    }
}