import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class ProductImage extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, ProductImage.schema());
    }

    static schema() {
        return z
            .url({ error: "ProductImageはURL形式である必要があります" });
    }
}