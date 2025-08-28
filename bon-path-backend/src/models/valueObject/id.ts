import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class Id extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, Id.schema());
    }

    static schema() {
        return z
            .int({ error: ERROR_MESSAGES.valueObjects.id.intError })
            .min(1, { error: ERROR_MESSAGES.valueObjects.id.minError })
    }
}