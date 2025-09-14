import { z } from "zod";
import BaseEntity from "../_abstruct";
import { AsPrimitives } from "../_asPrimitives";
import { OptionalToNullable } from "../_optionalToNullable";
import type { PurchaseType } from "./type";
import { CreatedAt, Id, PurchasePrice, PurchaseQuantity } from "@models/valueObject";

export default class PurchaseEntity extends BaseEntity<PurchaseType> {
    constructor(valueObjects: PurchaseType & { id?: Id, createdAt?: CreatedAt }) {
        const { id, createdAt, ...values } = valueObjects;
        super(values, PurchaseEntity.schema(), id, createdAt)
    }

    static schema() {
        return z.strictObject({
            userId: z.instanceof(Id),
            receiptId: z.instanceof(Id),
            storeId: z.instanceof(Id),
            productId: z.instanceof(Id),
            quantity: z.instanceof(PurchaseQuantity),
            price: z.instanceof(PurchasePrice)
        })
    }

    static fromPrimitives(primitives: OptionalToNullable<AsPrimitives<PurchaseType> & { id?: number, createdAt?: Date }>) {
        return new PurchaseEntity({
            id: primitives.id ? new Id(primitives.id) : undefined,
            createdAt: primitives.createdAt ? new CreatedAt(primitives.createdAt) : undefined,
            receiptId: new Id(primitives.receiptId),
            userId: new Id(primitives.userId),
            storeId: new Id(primitives.storeId),
            productId: new Id(primitives.productId),
            quantity: new PurchaseQuantity(primitives.quantity),
            price: new PurchasePrice(primitives.price)
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