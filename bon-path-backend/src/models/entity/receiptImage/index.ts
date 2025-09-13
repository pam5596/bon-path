import { z } from "zod";
import BaseEntity from "../_abstruct";
import { AsPrimitives } from "../_to_primitives";
import type { ReceiptImageType } from "./type";
import { CreatedAt, Id, ReceiptImageUrl } from "@models/valueObject";

export default class ReceiptImageEntity extends BaseEntity<ReceiptImageType> {
    constructor(valueObjects: ReceiptImageType & { id?: Id, createdAt?: CreatedAt }) {
        const { id, createdAt, ...values } = valueObjects;
        super(values, ReceiptImageEntity.schema(), id, createdAt)
    }

    static schema() {
        return z.strictObject({
            receiptId: z.instanceof(Id),
            url: z.instanceof(ReceiptImageUrl)
        })
    }

    static fromPrimitives(primitives: AsPrimitives<ReceiptImageType> & { id?: number, createdAt?: Date }) {
        return new ReceiptImageEntity({
            id: primitives.id ? new Id(primitives.id) : undefined,
            createdAt: primitives.createdAt ? new CreatedAt(primitives.createdAt) : undefined,
            receiptId: new Id(primitives.receiptId),
            url: new ReceiptImageUrl(primitives.url)
        })
    }


    get receiptId() {
        return this._values.receiptId
    }
}