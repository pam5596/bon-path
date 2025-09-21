import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class CategoryName extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, CategoryName.schema());
    }

    static schema() {
        return z
            .string()
            .min(1)
    }
}