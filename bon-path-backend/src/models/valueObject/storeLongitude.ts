import { z } from "zod";
import BaseValueObject from "./_abstruct";


export default class StoreLongitude extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, StoreLongitude.schema());
    }

    static schema() {
        return z
            .number()
            .min(-180)
            .max(180);
    }

    static querySchema() {
        return z
            .coerce
            .number()
            .min(-180)
            .max(180);
    }
}