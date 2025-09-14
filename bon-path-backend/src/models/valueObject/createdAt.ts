import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class CreatedAt extends BaseValueObject<Date> {
    constructor(value: Date) {
        super(value, CreatedAt.schema());
    }

    static schema() {
        return z
            .date()
            .max(Date.now())
    }
}