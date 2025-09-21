import { UserHashId, UserName, UserEmail, UserHashPassword } from "@models/valueObject";

export type UserType = {
    hashedId?: UserHashId
    name: UserName
    email: UserEmail
    password: UserHashPassword
}