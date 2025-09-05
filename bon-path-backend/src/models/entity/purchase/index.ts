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
            userId: z.instanceof(Id, { error: ERROR_MESSAGES.entity.purchase.userIdInstanceofError }),
            receiptId: z.instanceof(Id, { error: ERROR_MESSAGES.entity.purchase.receiptIdInstanceofError }),
            storeId: z.instanceof(Id, { error: ERROR_MESSAGES.entity.purchase.storeIdInstanceofError }),
            productId: z.instanceof(Id, { error: ERROR_MESSAGES.entity.purchase.productIdInstanceofError }),
            quantity: z.instanceof(PurchaseQuantity, { error: ERROR_MESSAGES.entity.purchase.quantityInstanceofError }),
            price: z.instanceof(PurchasePrice, { error: ERROR_MESSAGES.entity.purchase.priceInstanceofError }),
            createdAt: z.instanceof(CreatedAt, { error: ERROR_MESSAGES.entity._share.createdAt }).optional()
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