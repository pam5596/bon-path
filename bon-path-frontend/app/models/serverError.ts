export interface ServerError {
    code: number;
    path: string;
    detail: string;
    issue: string;
    stack?: string;
    instance: string;
    report?: unknown
}