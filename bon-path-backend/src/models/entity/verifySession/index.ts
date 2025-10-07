import { z } from "zod";
import BaseEntity from "../_abstruct";
import { AsPrimitives } from "../_asPrimitives";
import type { VerifySessionType } from "./type";
import { UserEmail, UserHashPassword, UserName } from "@models/valueObject";
import { JWTPayload } from "hono/utils/jwt/types";

export default class VerifySessionEntity extends BaseEntity<VerifySessionType> {
    constructor(valueObjects: VerifySessionType & JWTPayload) {
        super(valueObjects, VerifySessionEntity.schema())
    }

    static schema() {
        return z.object({
            userName: z.instanceof(UserName),
            userEmail: z.instanceof(UserEmail),
            userHashPassword: z.instanceof(UserHashPassword)
        })
    }

    static fromPrimitives(primitives: AsPrimitives<VerifySessionType> & JWTPayload) {
        return new VerifySessionEntity({
            ...primitives,
            userName: new UserName(primitives.userName),
            userEmail: new UserEmail(primitives.userEmail),
            userHashPassword: new UserHashPassword(primitives.userHashPassword)
        })
    }
}