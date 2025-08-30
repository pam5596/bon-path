import { z } from "zod";
import BaseEntity from "../_abstruct";
import type { ReceiptType } from "./type";
import { CreatedAt, Id, ReceiptIsChecked, ReceiptLatitude, ReceiptLongitude } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class ReceiptEntity extends BaseEntity<ReceiptType> {
    constructor(values: ReceiptType, id?: Id) {
        super(values, ReceiptEntity.schema(), id)
    }

    static schema() {
        return z.strictObject({
            userId: z.instanceof(Id, { error: ERROR_MESSAGES.entity.receipt.userIdInstanceofError }),
            isChecked: z.instanceof(ReceiptIsChecked, { error: ERROR_MESSAGES.entity.receipt.isCheckedInstanceofError }),
            latitude: z.instanceof(ReceiptLatitude, { error: ERROR_MESSAGES.entity.receipt.latitudeInstanceofError }),
            longitude: z.instanceof(ReceiptLongitude, { error: ERROR_MESSAGES.entity.receipt.longitudeInstanceofError }),
            createdAt: z.instanceof(CreatedAt, { error: ERROR_MESSAGES.entity._share.createdAt }).optional()
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