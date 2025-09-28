export default interface BaseService {
    client?: unknown;
    execute(request: any): Promise<unknown>
}