import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class StoreLatitude extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, StoreLatitude.schema());
    }

    static schema() {
        return z
            .number({ error: "StoreLatitudeは数値である必要があります" })
            .min(-90, { error: "StoreLatitudeは -90以上である必要があります" })
            .max(90, { error: "StoreLatitudeは 90以下である必要があります" });
    }
}