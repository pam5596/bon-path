import { z } from "zod";
import BaseEntity from "../_abstruct";
import { AsPrimitives } from "../_to_primitives";
import { EntityError } from "@error";
import type { UserType } from "./type";
import { CreatedAt, Id, UserEmail, UserHashId, UserName, UserHashPassword } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class UserEntity extends BaseEntity<UserType> {
    constructor(valueObjects: UserType & { id?: Id, createdAt?: CreatedAt }) {
        const { id, createdAt, ...values } = valueObjects;
        super(values, UserEntity.schema(), id, createdAt)
    }

    static schema() {
        return z.strictObject({
            hashedId: z.instanceof(UserHashId).optional(),
            name: z.instanceof(UserName),
            email: z.instanceof(UserEmail),
            password: z.instanceof(UserHashPassword)
        });
    }

    static fromPrimitives(primitives: AsPrimitives<UserType> & { id?: number, createdAt?: Date }) {
        return new UserEntity({
            hashedId: primitives.hashedId ? new UserHashId(primitives.hashedId) : undefined,
            name: new UserName(primitives.name),
            email: new UserEmail(primitives.email),
            password: new UserHashPassword(primitives.password),
            id: primitives.id ? new Id(primitives.id) : undefined,
            createdAt: primitives.createdAt ? new CreatedAt(primitives.createdAt) : undefined
        })
    }

    get hashedId() {
        return this._values.hashedId
    }

    set newHashedId(newHashedId: UserHashId) {
        if (this._values.hashedId) throw new EntityError(
            409,
            ERROR_MESSAGES.entity.user.newHashIdError.detail,
            ERROR_MESSAGES.entity.user.newHashIdError.issue,
            this.constructor.name
        )
        this._values.hashedId = newHashedId
    }

    set newValues(newValues: Partial<Omit<UserType, 'hashedId'>>) {
        this._values = this.validate({
            ... this._values, ...newValues
        }, UserEntity.schema())
    }
}