import { z } from "zod";
import BaseValueObject from "./_abstruct";


export default class UserHashId extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, UserHashId.schema());
    }

    static schema() {
        return z
            .string()
            .cuid()
    }
}