import BaseError from "./_abstruct";

export default class ValueObjectError extends BaseError {
    constructor(detail: string, issue: string, instance: string, report: unknown) {
        super(422, detail, issue, instance, report);
    }
}