import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

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
}