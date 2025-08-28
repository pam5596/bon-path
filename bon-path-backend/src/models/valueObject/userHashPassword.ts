import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class UserHashPassword extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, UserHashPassword.schema());
    }

    static schema() {
        return z
            .string({ error: ERROR_MESSAGES.valueObjects.userHashPassword.stringError })
            .regex(/^\$argon2(id|i|d)\$v=\d+\$m=\d+,t=\d+,p=\d+\$[A-Za-z0-9+/=]+\$[A-Za-z0-9+/=]+$/, { error: ERROR_MESSAGES.valueObjects.userHashPassword.argon2Error })
    }
}