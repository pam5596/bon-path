import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class StoreName extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, StoreName.schema());
    }

    static schema() {
        return z
            .string({ error: "StoreNameは文字列である必要があります"})
            .min(1, { error: "StoreNameは1文字以上である必要があります" })
    }
}