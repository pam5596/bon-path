import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class ProductImage extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, ProductImage.schema());
    }

    static schema() {
        return z
            .url({ error: ERROR_MESSAGES.valueObjects.productImage.urlError });
    }
}