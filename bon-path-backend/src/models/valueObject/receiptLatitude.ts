import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class ReceiptLatitude extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, ReceiptLatitude.schema());
    }

    static schema() {
        return z
            .number()
            .min(-90)
            .max(90);
    }
}