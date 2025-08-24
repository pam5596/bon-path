import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class userName extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, userName.schema());
    }

    static schema() {
        return z
            .string({ error: "UserNameは文字列である必要があります" })
            .min(1, { error: "UserNameは1文字以上である必要があります" })
            .max(30, { error: "UserNameは30文字以下である必要があります" })
            .refine((v) => v.trim().length > 0, { message: "UserNameは空白にすることはできません" });
    }
}