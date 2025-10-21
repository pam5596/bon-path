import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

export default class PurchaseQuantity extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, PurchaseQuantity.schema());
    }

    static schema() {
        return z
            .number()
            .int({ error: ERROR_MESSAGES.valueObjects._tag + ERROR_MESSAGES.valueObjects.purchaseQuantity.intError })
            .min(1, { error: ERROR_MESSAGES.valueObjects._tag + ERROR_MESSAGES.valueObjects.purchaseQuantity.minError })
    }
}