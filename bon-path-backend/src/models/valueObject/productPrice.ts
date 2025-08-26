import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class ProductPrice extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, ProductPrice.schema());
    }

    static schema() {
        return z
            .int({ error: "ProductPriceは整数値である必要があります"})
            .min(0, { error: "ProductPriceは0以上である必要があります" })
    }
}