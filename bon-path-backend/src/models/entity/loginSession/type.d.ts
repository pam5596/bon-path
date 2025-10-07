import { Id, UserHashId } from "@models/valueObject";

export type LoginSessionType = {
    readonly userId: Id
    readonly userHashId: UserHashId
}