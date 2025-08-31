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
            receiptId: z.instanceof(Id, { error: ERROR_MESSAGES.entity.receiptImage.receiptIdInstanceofError }),
            url: z.instanceof(ReceiptImageUrl, { error: ERROR_MESSAGES.entity.receiptImage.urlInstanceofError }),
            createdAt: z.instanceof(CreatedAt, { error: ERROR_MESSAGES.entity._share.createdAt }).optional()
        })
    }

    get receiptId() {
        return this._values.receiptId
    }
}