import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class ReceiptIsChecked extends BaseValueObject<boolean> {
    constructor(value: boolean) {
        super(value, ReceiptIsChecked.schema());
    }

    static schema() {
        return z
            .boolean()
    }
}