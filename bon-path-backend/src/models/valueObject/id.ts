import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class Id extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, Id.schema());
    }

    static schema() {
        return z
            .int({ error: "Idは整数である必要があります" })
            .min(1, { error: "Idは1以上である必要があります" })
    }
}