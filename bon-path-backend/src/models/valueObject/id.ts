import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class Id extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, Id.schema());
    }

    static schema() {
        return z
            .int()
            .min(1)
    }
}