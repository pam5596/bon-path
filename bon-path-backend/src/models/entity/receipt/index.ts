import { z } from "zod";
import BaseEntity from "../_abstruct";
import type { ReceiptType } from "./type";
import { CreatedAt, Id, ReceiptIsChecked, ReceiptLatitude, ReceiptLongitude } from "@models/valueObject";

export default class ReceiptEntity extends BaseEntity<ReceiptType> {
    constructor(values: ReceiptType, id?: Id, createdAt?: CreatedAt) {
        super(values, ReceiptEntity.schema(), id, createdAt)
    }

    static schema() {
        return z.strictObject({
            userId: z.instanceof(Id),
            isChecked: z.instanceof(ReceiptIsChecked),
            latitude: z.instanceof(ReceiptLatitude),
            longitude: z.instanceof(ReceiptLongitude)
        })
    }

    get userId() {
        return this._values.userId
    }

    toggleIsChecked() {
        this._values = {
            ...this._values,
            isChecked: new ReceiptIsChecked(!this._values.isChecked.value)
        }
    }
}