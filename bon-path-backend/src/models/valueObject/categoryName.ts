import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class CategoryName extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, CategoryName.schema());
    }

    static schema() {
        return z
            .string({ error: ERROR_MESSAGES.valueObjects.categoryName.stringError })
            .min(1, { error: ERROR_MESSAGES.valueObjects.categoryName.minError })
    }
}