import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class ReceiptImageUrl extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, ReceiptImageUrl.schema());
    }

    static schema() {
        return z
            .string()
            .url();
    }
}