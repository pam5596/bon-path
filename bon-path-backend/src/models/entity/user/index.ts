import { z } from "zod";
import BaseEntity from "../_abstruct";
import type { UserType, UserUpdatableType } from "./type";
import { CreatedAt, Id, UserEmail, UserHashId, UserName, UserHashPassword } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class UserEntity extends BaseEntity<UserType> {
    constructor(values: UserType, id?: Id) {
        super(values, UserEntity.schema(), id)
    }

    static schema() {
        return z.strictObject({
            hashedId: z.instanceof(UserHashId, { error: ERROR_MESSAGES.entity.user.hashIdInstanceofError }).optional(),
            name: z.instanceof(UserName, { error: ERROR_MESSAGES.entity.user.nameInstanceofError }),
            email: z.instanceof(UserEmail, { error:ERROR_MESSAGES.entity.user.emailInstanceofError }),
            password: z.instanceof(UserHashPassword, { error: ERROR_MESSAGES.entity.user.passwordInstanceofError }),
            createdAt: z.instanceof(CreatedAt, { error:ERROR_MESSAGES.entity._share.createdAt }).optional()
        });
    }

    get hashedId() {
        return this._values.hashedId
    }

    set newValues(newValues: UserUpdatableType) {
        this._values = this.validate({
            ... this._values, ...newValues
        }, UserEntity.schema())
    }
}