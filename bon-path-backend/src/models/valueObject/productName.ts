import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class ProductName extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, ProductName.schema());
    }

    static schema() {
        return z
            .string({ error: "ProductNameは文字列である必要があります"})
            .min(1, { error: "ProductNameは1文字以上である必要があります" })
    }
}