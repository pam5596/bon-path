import { Argon2Client } from "@client";
import BaseService from "./_interface";
import { UserHashPassword, UserPassword } from "@models/valueObject";


export class UserPasswordVerifyService implements BaseService {
    constructor(
        public client: Argon2Client
    ){}

    async execute(request: {
        hashedPassword: UserHashPassword,
        rowPassword: UserPassword
    }): Promise<boolean> {
        return await this.client.verify(
            request.hashedPassword.value, 
            request.rowPassword.value
        )
    }
}