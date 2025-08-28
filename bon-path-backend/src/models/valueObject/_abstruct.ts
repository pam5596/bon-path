import { z } from "zod";
import { ValueObjectError } from "@error";

export default abstract class BaseValueObject<T> {
    protected readonly _value: T;

    constructor(value: T, schema: z.ZodType<T>) {
        this._value = this.validate(value, schema);
    }

    validate(value: T, schema: z.ZodType<T>): T {
        const parse_result = schema.safeParse(value);

        if (!parse_result.success) {
            const zod_error_issues = parse_result.error.issues
            throw new ValueObjectError(
                zod_error_issues.map((issue) => issue.message).join("\n"),
                zod_error_issues.map((issue) => issue.message).join("\n"),
                this.constructor.name
            );
        }
        return parse_result.data;
    }

    get value(): T {
        return this._value;
    }

    equals(other: BaseValueObject<T>): boolean {
        return this._value === other._value;
    }
}