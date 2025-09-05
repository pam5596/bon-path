import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class ReceiptIsChecked extends BaseValueObject<boolean> {
    constructor(value: boolean) {
        super(value, ReceiptIsChecked.schema());
    }

    static schema() {
        return z
            .boolean()
    }
}