import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

export default class UserPassword extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, UserPassword.schema());
    }

    static schema() {
        return z
            .string()
            .min(6, { error: ERROR_MESSAGES.valueObjects._tag + ERROR_MESSAGES.valueObjects.userPassword.minError })
            .max(32, { error: ERROR_MESSAGES.valueObjects._tag + ERROR_MESSAGES.valueObjects.userPassword.maxError })
            .regex(/^[A-Za-z0-9]+$/, { error: ERROR_MESSAGES.valueObjects._tag + ERROR_MESSAGES.valueObjects.userPassword.regexError })
    }
}