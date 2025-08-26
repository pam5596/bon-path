import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class CategoryName extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, CategoryName.schema());
    }

    static schema() {
        return z
            .string({ error: "CategoryNameは文字列である必要があります"})
            .min(1, { error: "CategoryNameは1文字以上である必要があります" })
    }
}