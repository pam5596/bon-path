import BaseError from "./_abstruct";

export default class EntityError extends BaseError {
    constructor(code: number, detail: string, issue: string, instance: string, report?: unknown) {
        super(code, detail, issue, instance, report);
    }
}