import { unknown, z } from "zod";
import BaseValueObject from "@models/valueObject/_abstruct";
import { EntityError } from "@error";
import { Id } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default abstract class BaseEntity<T extends Record<string, BaseValueObject<unknown>>> {
    protected _id?: Id
    protected _values: T

    constructor(values: T, schema: z.ZodObject<z.ZodRawShape>, id?: Id) {
        this._values = this.validate(values, schema);
        this._id = id
    }

    validate(values: T, schema: z.ZodObject<z.ZodRawShape>): T {
        const parse_result = schema.safeParse(values, { reportInput: true});

        if (!parse_result.success) {
            const zod_error_issues = parse_result.error.issues
            throw new EntityError(
                400,
                zod_error_issues.map((issue) => issue.message).join(", "),
                zod_error_issues.map((issue) => issue.code).join(", "),
                this.constructor.name,
                zod_error_issues[0].input
            );
        }

        return parse_result.data as T;
    }

    get id() {
        return this._id
    }

    get getValues() {
        return this._values
    }

    get getRowValues(): {
        [K in keyof T]: NonNullable<T[K]> extends { value: infer V } ? V : never;
    } {
        return Object.fromEntries(
            Object.entries(this._values).map(
                ([key, valueObject]) => [key, valueObject.value]
            )
        ) as {
            [K in keyof T]: NonNullable<T[K]> extends { value: infer V } ? V : never
        };
    }

    set newId(newId: Id) {
        if (this._id) throw new EntityError(
            409,
            ERROR_MESSAGES.entity._abstruct.setIdError.detail,
            ERROR_MESSAGES.entity._abstruct.setIdError.issue,
            this.constructor.name
        )
        this._id = newId
    }

    equals(other: BaseEntity<T>): boolean {
        return this._id === other._id;
    }
}