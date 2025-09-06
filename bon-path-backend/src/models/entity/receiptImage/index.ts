import { optional, z } from "zod";
import BaseEntity from "../_abstruct";
import type { ReceiptImageType } from "./type";
import { CreatedAt, Id, ReceiptImageUrl } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class ReceiptImageEntity extends BaseEntity<ReceiptImageType> {
    constructor(value: ReceiptImageType, id?: Id) {
        super(value, ReceiptImageEntity.schema(), id)
    }

    static schema() {
        return z.strictObject({
            receiptId: z.instanceof(Id),
            url: z.instanceof(ReceiptImageUrl),
            createdAt: z.instanceof(CreatedAt).optional()
        })
    }

    get receiptId() {
        return this._values.receiptId
    }
}