import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class ProductLink extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, ProductLink.schema());
    }

    static schema() {
        return z
            .string()
            .url();
    }
}