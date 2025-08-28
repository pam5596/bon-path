import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class StoreLatitude extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, StoreLatitude.schema());
    }

    static schema() {
        return z
            .number({ error: ERROR_MESSAGES.valueObjects.storeLatitude.numberError })
            .min(-90, { error: ERROR_MESSAGES.valueObjects.storeLatitude.minError })
            .max(90, { error: ERROR_MESSAGES.valueObjects.storeLatitude.maxError });
    }
}