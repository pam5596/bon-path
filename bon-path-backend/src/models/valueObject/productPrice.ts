import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class ProductPrice extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, ProductPrice.schema());
    }

    static schema() {
        return z
            .int({ error: ERROR_MESSAGES.valueObjects.productPrice.intError })
            .min(0, { error: ERROR_MESSAGES.valueObjects.productPrice.minError })
    }
}