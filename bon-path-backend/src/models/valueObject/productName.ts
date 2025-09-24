import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class ProductName extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, ProductName.schema());
    }

    static schema() {
        return z
            .string()
            .min(1, { message: ERROR_MESSAGES.valueObjects._tag + ERROR_MESSAGES.valueObjects.productName.minError })
    }
}