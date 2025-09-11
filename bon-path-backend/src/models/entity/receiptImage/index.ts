import { z } from "zod";
import BaseEntity from "../_abstruct";
import type { ReceiptImageType } from "./type";
import { CreatedAt, Id, ReceiptImageUrl } from "@models/valueObject";

export default class ReceiptImageEntity extends BaseEntity<ReceiptImageType> {
    constructor(value: ReceiptImageType, id?: Id, createdAt?: CreatedAt) {
        super(value, ReceiptImageEntity.schema(), id, createdAt)
    }

    static schema() {
        return z.strictObject({
            receiptId: z.instanceof(Id),
            url: z.instanceof(ReceiptImageUrl)
        })
    }

    get receiptId() {
        return this._values.receiptId
    }
}