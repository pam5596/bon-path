import BaseError from "./_abstruct";

export default class ServiceError extends BaseError {
    constructor(
        detail: string, 
        issue: string,
        instance: string,
        report: unknown
    ) {
        super(500, detail, issue, instance, report);
    }
}