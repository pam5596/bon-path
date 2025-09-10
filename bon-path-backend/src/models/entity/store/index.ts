import { z } from "zod";
import BaseEntity from "../_abstruct";
import type { StoreType, StoreUpdatableType } from "./type";
import { CreatedAt, Id, StoreGoogleMapLink, StoreImage, StoreLatitude, StoreLongitude, StoreName } from "@models/valueObject";

export default class StoreEntity extends BaseEntity<StoreType> {
    constructor(values: StoreType, id?: Id, createdAt?: CreatedAt) {
        super(values, StoreEntity.schema(), id, createdAt)
    }

    static schema() {
        return z.strictObject({
            name: z.instanceof(StoreName),
            image: z.instanceof(StoreImage).optional(),
            latitude: z.instanceof(StoreLatitude).optional(),
            longitude: z.instanceof(StoreLongitude).optional(),
            googleMapLink: z.instanceof(StoreGoogleMapLink).optional()
        })
    }

    set newValues(newValues: Partial<StoreUpdatableType>) {
        this._values = this.validate({
            ...this._values, ...newValues
        }, StoreEntity.schema())
    }
}