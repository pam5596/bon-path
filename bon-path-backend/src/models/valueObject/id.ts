import { z } from "zod";
import BaseValueObject from "./_abstruct";


export default class Id extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, Id.schema());
    }

    static schema() {
        return z
            .coerce
            .number()
            .int()
            .min(1)
    }

    static paramSchema() {
        return z
            .coerce
            .number()
            .int()
            .min(1)
    }
}