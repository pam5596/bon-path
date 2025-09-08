import { z } from "zod";
import BaseEntity from "../_abstruct";
import { EntityError } from "@error";
import type { UserType, UserUpdatableType } from "./type";
import { CreatedAt, Id, UserEmail, UserHashId, UserName, UserHashPassword } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class UserEntity extends BaseEntity<UserType> {
    constructor(values: UserType, id?: Id, createdAt?: CreatedAt) {
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

    set newValues(newValues: Partial<UserUpdatableType>) {
        this._values = this.validate({
            ... this._values, ...newValues
        }, UserEntity.schema())
    }
}