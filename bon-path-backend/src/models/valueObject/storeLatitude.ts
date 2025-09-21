import { z } from "zod";
import BaseValueObject from "./_abstruct";


export default class StoreLatitude extends BaseValueObject<number> {
    constructor(value: number) {
        super(value, StoreLatitude.schema());
    }

    static schema() {
        return z
            .number()
            .min(-90)
            .max(90);
    }
}