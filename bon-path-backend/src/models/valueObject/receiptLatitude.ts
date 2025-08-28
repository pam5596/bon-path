import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class ReceiptLatitude extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, ReceiptLatitude.schema());
    }

    static schema() {
        return z
            .number({ error: ERROR_MESSAGES.valueObjects.receiptLatitude.numberError })
            .min(-90, { error: ERROR_MESSAGES.valueObjects.receiptLatitude.minError })
            .max(90, { error: ERROR_MESSAGES.valueObjects.receiptLatitude.maxError });
    }
}