import { z } from "zod";
import BaseValueObject from "./_abstruct";

export default class StoreGoogleMapLink extends BaseValueObject<string> {
    constructor(value: string) {
        super(value, StoreGoogleMapLink.schema());
    }

    static schema() {
        return z
            .url({ error: "StoreGoogleMapLinkはURL形式である必要があります" });
    }
}