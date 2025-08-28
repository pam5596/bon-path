import { z } from "zod";
import { EntityError } from "@models/error";
import { Id } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default abstract class BaseEntity<T> {
    protected _id?: Id
    protected _values: T

    constructor(values: T, schema: z.ZodObject<z.ZodRawShape>, id?: Id) {
        this._id = id
        this._values = this.validate(values, schema);
    }

    validate(values: T, schema: z.ZodObject<z.ZodRawShape>): T {
        const parse_result = schema.safeParse(values);

        if (!parse_result.success) {
            const zod_error_issues = parse_result.error.issues
            throw new EntityError(
                400,
                zod_error_issues.map((issue) => issue.message).join("\n"),
                zod_error_issues.map((issue) => issue.code).join("\n"),
                this.constructor.name
            );
        }

        return parse_result.data as T;
    }

    get id() {
        return this._id
    }

    get values() {
        return this._values
    }

    set setId(newId: Id) {
        if (this._id) throw new EntityError(
            409,
            ERROR_MESSAGES.entity._abstruct.setIdError.detail,
            ERROR_MESSAGES.entity._abstruct.setIdError.issue,
            this.constructor.name
        )
        this._id = newId
    }

    abstract set updateSafeValues(newValues: any)

    equals(other: BaseEntity<T>): boolean {
        return this._id === other._id;
    }
}