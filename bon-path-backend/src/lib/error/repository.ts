import BaseError from "./_abstruct";

export default class RepositoryError extends BaseError {
    constructor(
        detail: string, 
        prismaCode: string, 
        prismaMessage: string, 
        instance: string,
        method: string | symbol,
        report: unknown
    ) {
        super(500, detail, `[${prismaCode}] ${prismaMessage}`, `${instance}.${String(method)}`, report);
    }
}