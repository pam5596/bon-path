import BaseError from "./_abstruct";

export default class ClientError extends BaseError {
    constructor(
        code: number,
        detail: string, 
        issue: string, 
        instance: string,
        method: string | symbol,
        report?: unknown
    ) {
        super(
            code,
            detail,
            issue,
            `${instance}.${String(method)}`,
            report
        )
    }
}