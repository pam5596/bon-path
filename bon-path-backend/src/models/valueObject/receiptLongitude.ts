import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class ReceiptLongitude extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, ReceiptLongitude.schema());
    }

    static schema() {
        return z
            .number({ error: "ReceiptLongitudeは数値である必要があります" })
            .min(-180, { error: "ReceiptLongitudeは -180以上である必要があります" })
            .max(180, { error: "ReceiptLongitudeは 180以下である必要があります" });
    }
}