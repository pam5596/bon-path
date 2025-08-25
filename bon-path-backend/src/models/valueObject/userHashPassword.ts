import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class UserHashPassword extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, UserHashPassword.schema());
    }

    static schema() {
        return z
            .string({ error: "UserPasswordは文字列である必要があります" })
            .regex(/^\$argon2(id|i|d)\$v=\d+\$m=\d+,t=\d+,p=\d+\$[A-Za-z0-9+/=]+\$[A-Za-z0-9+/=]+$/, { error: "UserHashPasswordはargon2形式である必要があります"})
    }
}