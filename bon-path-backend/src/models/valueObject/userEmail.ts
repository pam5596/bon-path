import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

export default class UserEmail extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, UserEmail.schema());
    }

    static schema() {
        return z
            .string()
            .email({ error: ERROR_MESSAGES.valueObjects._tag + ERROR_MESSAGES.valueObjects.userEmail.emailError });
    }
}