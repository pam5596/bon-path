import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class UserName extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, UserName.schema());
    }

    static schema() {
        return z
            .string({ error: ERROR_MESSAGES.valueObjects.userName.stringError })
            .min(1, { error: ERROR_MESSAGES.valueObjects.userName.minError })
            .max(30, { error: ERROR_MESSAGES.valueObjects.userName.maxError })
            .refine((v) => v.trim().length > 0, { message: ERROR_MESSAGES.valueObjects.userName.emptyError });
    }
}