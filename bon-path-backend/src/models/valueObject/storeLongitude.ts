import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class StoreLongitude extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, StoreLongitude.schema());
    }

    static schema() {
        return z
            .number({ error: "StoreLongitudeは数値である必要があります" })
            .min(-180, { error: "StoreLongitudeは -180以上である必要があります" })
            .max(180, { error: "StoreLongitudeは 180以下である必要があります" });
    }
}