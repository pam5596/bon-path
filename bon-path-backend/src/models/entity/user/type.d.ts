import { UserHashId, UserName, UserEmail, UserHashPassword, Id, CreatedAt } from "@models/valueObject";

export type UserType = {
    hashedId?: UserHashId
    name: UserName
    email: UserEmail
    password: UserHashPassword
    readonly createdAt?: CreatedAt
}

export type UserUpdatableType = {
    name: UserName
    email: UserEmail
    password: UserHashPassword
}