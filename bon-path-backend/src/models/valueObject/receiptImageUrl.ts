import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class ReceiptImageUrl extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, ReceiptImageUrl.schema());
    }

    static schema() {
        return z
            .url({ error: ERROR_MESSAGES.valueObjects.receiptImageUrl.urlError });
    }
}