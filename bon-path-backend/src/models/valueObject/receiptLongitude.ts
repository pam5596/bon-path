import { z } from "zod";
import BaseValueObject from "./_abstruct";


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