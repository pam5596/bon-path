import argon2 from "argon2";
import { ClientError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

export class Argon2Client {
    constructor(private options: argon2.Options) {}

    async hash(rowPassword: string) {
        try {
            return await argon2.hash(rowPassword, this.options)
        } catch (e) {
            if (e instanceof Error) {
                throw new ClientError(
                    500,
                    ERROR_MESSAGES.client.argon2,
                    e.message,
                    this.constructor.name,
                    'hash',
                    rowPassword
                )
            } else {
                throw e
            }
        }
    }

    async verify(hashedPassword: string, rowPassword: string) {
        try {
            return await argon2.verify(hashedPassword, rowPassword)
        } catch (e) {
            if (e instanceof Error) {
                throw new ClientError(
                    500,
                    ERROR_MESSAGES.client.argon2,
                    e.message,
                    this.constructor.name,
                    'verify',
                    {
                        hashedPassword, 
                        rowPassword
                    }
                )
            } else {
                throw e
            }
        }
    }
}