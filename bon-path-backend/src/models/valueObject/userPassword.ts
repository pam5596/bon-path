import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class UserPassword extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, UserPassword.schema());
    }

    static schema() {
        return z
            .string({ error: "UserPasswordは文字列である必要があります" })
            .min(6, { error: "UserPasswordは6文字以上である必要があります" })
            .max(32, { error: "UserPasswordは32文字以下である必要があります" })
            .regex(/^[A-Za-z0-9]+$/, { error: "UserPasswordは半角英数字（大文字・小文字・数字）のみ使用可能です"})
    }
}