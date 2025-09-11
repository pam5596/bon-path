import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class  ReceiptLongitude extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, ReceiptLongitude.schema());
    }

    static schema() {
        return z
            .number()
            .min(-180)
            .max(180);
    }
}