import BaseValueObject from "@models/valueObject/_abstruct";
import z, { ZodType } from "zod";
import type { PayloadType } from "@share/payloads";
import type { PayloadValueObjectMapper } from "./_payloadValueObjectMapper";

export default abstract class BasePayload<T extends PayloadType> {
    constructor(
        protected _values?: T
    ) {}

    get getBody(): T['body'] {
        return this._values?.body
    }

    get getParams(): T['params'] {
        return this._values?.params
    }

    get getQuery(): T['query'] {
        return this._values?.query
    }

    get getCookies(): T['cookies'] {
        return this._values?.cookies
    }

    get getHeaders(): T['headers'] {
        return this._values?.headers
    }

    abstract schema(): {
        body?:      z.ZodObject<{[K in keyof T['body'   ]]: ZodType<unknown>}, z.core.$strict>,
        params?:    z.ZodObject<{[K in keyof T['params' ]]: ZodType<unknown>}, z.core.$strict>,
        query?:     z.ZodObject<{[K in keyof T['query'  ]]: ZodType<unknown>}, z.core.$strict>,
        cookies?:   z.ZodObject<{[K in keyof T['cookies']]: ZodType<unknown>}, z.core.$strict>,
        headers?:   z.ZodObject<{[K in keyof T['headers']]: ZodType<unknown>}, z.core.$strict>,
    }

    toValueObjectBody?(): { 
        [K in keyof T['body']]: PayloadValueObjectMapper<T['body'][K]>
    }

    toValueObjectParams?(): { 
        [K in keyof T['params']]: BaseValueObject<T['params'][K]> | T['params'][K] 
    }

    toValueObjectQuery?(): { 
        [K in keyof T['query']] : BaseValueObject<T['query'][K]> | T['query'][K] 
    }
}