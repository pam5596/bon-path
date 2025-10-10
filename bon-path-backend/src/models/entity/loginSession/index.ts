import { z } from "zod";
import BaseEntity from "../_abstruct";
import { AsPrimitives } from "../_asPrimitives";
import type { LoginSessionType } from "./type";
import { Id, UserHashId } from "@models/valueObject";

export default class LoginSessionEntity extends BaseEntity<LoginSessionType> {
    constructor(valueObjects: LoginSessionType) {
        super(valueObjects, LoginSessionEntity.schema())
    }

    static schema() {
        return z.object({
            userId: z.instanceof(Id),
            userHashId: z.instanceof(UserHashId)
        })
    }

    static fromPrimitives(primitives: AsPrimitives<LoginSessionType>) {
        return new LoginSessionEntity({
            ...primitives,
            userId: new Id(primitives.userId),
            userHashId: new UserHashId(primitives.userHashId)
        })
    }
}