import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class PurchaseQuantity extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, PurchaseQuantity.schema());
    }

    static schema() {
        return z
            .int({ error: "PurchaseQuantityは整数値である必要があります"})
            .min(1, { error: "PurchaseQuantityは1以上である必要があります" })
    }
}