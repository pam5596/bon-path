export default interface BaseService {
    request: unknown;
    client?: unknown;
    execute(): Promise<unknown>
}