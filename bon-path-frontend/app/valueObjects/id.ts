import z from "zod";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class IdValueObject {
    static schema() {
        return z.coerce.number().int().min(1)
    }
}