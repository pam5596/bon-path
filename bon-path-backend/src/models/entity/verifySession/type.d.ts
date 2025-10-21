import { UserName, UserEmail, UserHashPassword } from "@models/valueObject";

export type VerifySessionType = {
    userName: UserName,
    userEmail: UserEmail,
    userHashPassword: UserHashPassword
}