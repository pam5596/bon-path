import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class UserHashId extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, UserHashId.schema());
    }

    static schema() {
        return z
            .cuid({ error: "UserHashIdはcuid形式である必要があります" })
    }
}