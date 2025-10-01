import z from "zod";

export default abstract class BasePayload<T extends {
    body?:      Record<string, unknown>,
    params?:    Record<string, unknown>,
    query?:     Record<string, unknown>,
    cookies?:   Record<string, unknown>,
    headers?:   Record<string, unknown>,
}> {
    constructor(
        protected _values: T
    ){}

    get getValues(): T {
        return this._values
    }

    static schema?(): {
        body?: z.ZodObject,
        params?: z.ZodObject,
        query?: z.ZodObject,
        cookies?: z.ZodObject,
        headers?: z.ZodObject 
    }

    public toValueObjects?(): void
}