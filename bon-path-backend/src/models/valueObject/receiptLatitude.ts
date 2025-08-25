import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class ReceiptLatitude extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, ReceiptLatitude.schema());
    }

    static schema() {
        return z
            .number({ error: "ReceiptLatitudeは数値である必要があります" })
            .min(-90, { error: "ReceiptLatitudeは -90以上である必要があります" })
            .max(90, { error: "ReceiptLatitudeは 90以下である必要があります" });
    }
}