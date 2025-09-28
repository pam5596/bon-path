import { Argon2Client } from "@client";
import BaseService from "./_interface";
import { UserHashPassword, UserPassword } from "@models/valueObject";


export class UserPasswordHashService implements BaseService {
    constructor(
        public client: Argon2Client
    ){}

    async execute(request: UserPassword): Promise<UserHashPassword> {
        const response = await this.client.hash(request.value)
        return new UserHashPassword(response)
    }
}