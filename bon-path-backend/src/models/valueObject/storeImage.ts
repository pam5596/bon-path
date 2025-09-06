import { z } from "zod";
import BaseValueObject from "./_abstruct";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class StoreImage extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, StoreImage.schema());
    }

    static schema() {
        return z
            .url();
    }
}