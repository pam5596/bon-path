import { z } from "zod";
import BaseEntity from "../_abstruct";
import type { PurchaseType } from "./type";
import { CreatedAt, Id, PurchasePrice, PurchaseQuantity } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class PurchaseEntity extends BaseEntity<PurchaseType> {
    constructor(values: PurchaseType, id?: Id) {
        super(values, PurchaseEntity.schema(), id)
    }

    static schema() {
        return z.strictObject({
            userId: z.instanceof(Id),
            receiptId: z.instanceof(Id),
            storeId: z.instanceof(Id),
            productId: z.instanceof(Id),
            quantity: z.instanceof(PurchaseQuantity),
            price: z.instanceof(PurchasePrice),
            createdAt: z.instanceof(CreatedAt).optional()
        })
    }

    get userId() {
        return this._values.userId
    }

    get receiptId() {
        return this._values.receiptId
    }

    get storeId() {
        return this._values.storeId
    }

    get productId() {
        return this._values.productId
    }
}