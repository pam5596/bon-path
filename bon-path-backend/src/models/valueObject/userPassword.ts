import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class UserPassword extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, UserPassword.schema());
    }

    static schema() {
        return z
            .string({ error: ERROR_MESSAGES.valueObjects.userPassword.stringError })
            .min(6, { error: ERROR_MESSAGES.valueObjects.userPassword.minError })
            .max(32, { error: ERROR_MESSAGES.valueObjects.userPassword.maxError })
            .regex(/^[A-Za-z0-9]+$/, { error: ERROR_MESSAGES.valueObjects.userPassword.regexError })
    }
}