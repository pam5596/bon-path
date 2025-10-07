import { z } from "zod";
import BaseEntity from "../_abstruct";
import { AsPrimitives } from "../_asPrimitives";
import type { VerifySessionType } from "./type";
import { UserEmail, UserHashPassword, UserName } from "@models/valueObject";

export default class VerifySessionEntity extends BaseEntity<VerifySessionType> {
    constructor(valueObjects: VerifySessionType) {
        super(valueObjects, VerifySessionEntity.schema())
    }

    static schema() {
        return z.object({
            userName: z.instanceof(UserName),
            userEmail: z.instanceof(UserEmail),
            userHashPassword: z.instanceof(UserHashPassword)
        })
    }

    static fromPrimitives(primitives: AsPrimitives<VerifySessionType>) {
        return new VerifySessionEntity({
            ...primitives,
            userName: new UserName(primitives.userName),
            userEmail: new UserEmail(primitives.userEmail),
            userHashPassword: new UserHashPassword(primitives.userHashPassword)
        })
    }
}