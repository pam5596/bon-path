import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class UserEmail extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, UserEmail.schema());
    }

    static schema() {
        return z
            .email({ error: "UserEmailは有効なメールアドレス形式である必要があります" });
    }
}