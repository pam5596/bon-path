import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class ProductName extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, ProductName.schema());
    }

    static schema() {
        return z
            .string({ error: ERROR_MESSAGES.valueObjects.productName.stringError })
            .min(1, { error: ERROR_MESSAGES.valueObjects.productName.minError })
    }
}