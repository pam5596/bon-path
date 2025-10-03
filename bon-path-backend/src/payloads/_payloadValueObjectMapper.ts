import BaseValueObject from "@models/valueObject/_abstruct";

export type PayloadValueObjectMapper<T> = 
    [T] extends [Date | File | boolean]
        ? BaseValueObject<T> | T
        :  T extends object
            ? { [K in keyof T]: PayloadValueObjectMapper<T[K]>}
            : T extends Array<infer U> 
                ? Array<PayloadValueObjectMapper<U>>
                : BaseValueObject<T> | T
