import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class CreatedAt extends BaseValueObject<Date> {
    constructor(value: Date) {
        super(value, CreatedAt.schema());
    }

    static schema() {
        return z
            .date()
            .max(new Date())
    }

    equals(other: CreatedAt): boolean {
        return this._value.getTime() === other._value.getTime();
    }
}