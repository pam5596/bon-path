import { z } from "zod";
import BaseEntity from "../_abstruct";
import type { UserType, UserUpdatableType } from "./type";
import { CreatedAt, Id, UserEmail, UserHashId, UserName, UserHashPassword } from "@models/valueObject";

export default class UserEntity extends BaseEntity<UserType> {
    constructor(values: UserType, id?: Id) {
        super(values, UserEntity.schema(), id)
    }

    static schema() {
        return z.strictObject({
            hashedId: z.instanceof(UserHashId).optional(),
            name: z.instanceof(UserName),
            email: z.instanceof(UserEmail),
            password: z.instanceof(UserHashPassword),
            createdAt: z.instanceof(CreatedAt).optional()
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