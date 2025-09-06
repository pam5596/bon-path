import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class UserHashId extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, UserHashId.schema());
    }

    static schema() {
        return z
            .cuid()
    }
}