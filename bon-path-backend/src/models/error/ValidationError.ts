import BaseError from "./_abstruct";

export default class ValidationError extends BaseError {
    constructor(detail: string, issue: string, instance: string) {
        super(422, detail, issue, instance);
    }
}