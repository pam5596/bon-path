export default abstract class BaseError extends Error {
    code: number;
    detail: string;
    issue: string;
    instance: string;

    constructor(code: number, detail: string, issue: string, instance: string) {
        super(detail);
        this.code = code
        this.detail = detail;
        this.issue = issue;
        this.instance = instance;
    }
}