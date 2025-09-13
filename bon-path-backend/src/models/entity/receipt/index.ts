import { z } from "zod";
import BaseEntity from "../_abstruct";
import { AsPrimitives } from "../_to_primitives";
import type { ReceiptType } from "./type";
import { CreatedAt, Id, ReceiptIsChecked, ReceiptLatitude, ReceiptLongitude } from "@models/valueObject";

export default class ReceiptEntity extends BaseEntity<ReceiptType> {
    constructor(valueObjects: ReceiptType & { id?: Id, createdAt?: CreatedAt }) {
        const { id, createdAt, ...values } = valueObjects;
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

    static fromPrimitives(primitives: AsPrimitives<ReceiptType> & { id?: number, createdAt?: Date }) {
        return new ReceiptEntity({
            userId: new Id(primitives.userId),
            isChecked: new ReceiptIsChecked(primitives.isChecked),
            latitude: new ReceiptLatitude(primitives.latitude),
            longitude: new ReceiptLongitude(primitives.longitude),
            id: primitives.id ? new Id(primitives.id) : undefined,
            createdAt: primitives.createdAt ? new CreatedAt(primitives.createdAt) : undefined
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