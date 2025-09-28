import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class UserEmail extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, UserEmail.schema());
    }

    static schema() {
        return z
            .string()
            .email({ message: ERROR_MESSAGES.valueObjects._tag + ERROR_MESSAGES.valueObjects.userEmail.emailError });
    }
}