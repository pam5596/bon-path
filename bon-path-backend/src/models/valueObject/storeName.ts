import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class StoreName extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, StoreName.schema());
    }

    static schema() {
        return z
            .string({ error: ERROR_MESSAGES.valueObjects.storeName.stringError })
            .min(1, { error: ERROR_MESSAGES.valueObjects.storeName.minError })
    }
}