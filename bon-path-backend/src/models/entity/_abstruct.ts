import { z } from "zod";
import { AsPrimitives } from "./_asPrimitives";
import BaseValueObject from "@models/valueObject/_abstruct";
import { EntityError } from "@lib/error";
import { CreatedAt, Id } from "@models/valueObject";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

export default abstract class BaseEntity<T extends Record<string, BaseValueObject<unknown>>> {
    protected _id?: Id
    protected _createdAt?: CreatedAt
    protected _values: T

    constructor(values: T, schema: z.ZodObject<z.ZodRawShape>, id?: Id, createdAt?: CreatedAt) {
        this._values = this.validate(values, schema);
        this._id = id
        this._createdAt = createdAt
    }

    validate(values: T, schema: z.ZodObject<z.ZodRawShape>): T {
        const parse_result = schema.safeParse(values);

        if (!parse_result.success) {
            const zod_error_issues = parse_result.error.issues
            throw new EntityError(
                400,
                zod_error_issues.map((issue) => issue.message).join(", "),
                zod_error_issues.map((issue) => issue.code).join(", "),
                this.constructor.name,
                values
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

    get toPrimitives(): AsPrimitives<T> {
        return Object.fromEntries(
            Object.entries(this._values).map(
                ([key, valueObject]) => [key, valueObject.value]
            )
        ) as AsPrimitives<T>
    }

    get getCreatedAt() {
        return this._createdAt
    }

    set newId(newId: Id) {
        if (this._id) throw new EntityError(
            409,
            ERROR_MESSAGES.entity._abstruct.newIdError.detail,
            ERROR_MESSAGES.entity._abstruct.newIdError.issue,
            this.constructor.name
        )
        this._id = newId
    }

    set created(at: CreatedAt) {
        if (this._createdAt) throw new EntityError(
            409,
            ERROR_MESSAGES.entity._abstruct.newIdError.detail,
            ERROR_MESSAGES.entity._abstruct.newIdError.issue,
            this.constructor.name
        )
        this._createdAt = at
    }

    equals(other: BaseEntity<T>): boolean {
        return this._id === other._id;
    }
}