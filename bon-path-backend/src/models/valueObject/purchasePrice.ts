import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class PurchasePrice extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, PurchasePrice.schema());
    }

    static schema() {
        return z
            .int({ error: ERROR_MESSAGES.valueObjects.purchasePrice.intError })
            .min(0, { error: ERROR_MESSAGES.valueObjects.purchasePrice.minError })
    }
}