import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class ReceiptLongitude extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, ReceiptLongitude.schema());
    }

    static schema() {
        return z
            .number({ error: ERROR_MESSAGES.valueObjects.receiptLongitude.numberError })
            .min(-180, { error: ERROR_MESSAGES.valueObjects.receiptLongitude.minError })
            .max(180, { error: ERROR_MESSAGES.valueObjects.receiptLongitude.maxError });
    }
}