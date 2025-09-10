import BaseValueObject from "@models/valueObject/_abstruct";

export default function nullableMapper<T>(
    value: T | null,
    toValueObject: (v: T) => BaseValueObject<T>
) {
    return value ? toValueObject(value) : undefined
}