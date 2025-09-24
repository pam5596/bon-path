import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class UserName extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, UserName.schema());
    }

    static schema() {
        return z
            .string()
            .min(1, { message: ERROR_MESSAGES.valueObjects._tag + ERROR_MESSAGES.valueObjects.userName.minError })
            .max(30, { message: ERROR_MESSAGES.valueObjects._tag + ERROR_MESSAGES.valueObjects.userName.maxError })
            .refine((v) => v.trim().length > 0, { message: ERROR_MESSAGES.valueObjects._tag + ERROR_MESSAGES.valueObjects.userName.emptyError });
    }
}