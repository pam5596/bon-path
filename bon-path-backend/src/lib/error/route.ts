import BaseError from "./_abstruct";

export default class RouteError extends BaseError {
    constructor(
        code: number,
        detail: string,
        issue: string,
        instance: string,
        route: string,
        method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT',
        report: unknown
    ) {
        super(
            code, detail, issue, `[${instance}] ${method}: ${route}`, report);
    }
}