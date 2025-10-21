import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class ProductPrice extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, ProductPrice.schema());
    }

    static schema() {
        return z
            .number()
            .int()
            .min(0)
    }
}