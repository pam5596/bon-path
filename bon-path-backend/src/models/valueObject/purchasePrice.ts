import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class PurchasePrice extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, PurchasePrice.schema());
    }

    static schema() {
        return z
            .int({ error: "PurchasePriceは整数値である必要があります"})
            .min(0, { error: "PurchasePriceは0以上である必要があります" })
    }
}