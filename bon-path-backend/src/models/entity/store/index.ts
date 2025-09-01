import { z } from "zod";
import BaseEntity from "../_abstruct";
import type { StoreType, StoreUpdatableType } from "./type";
import { CreatedAt, Id, StoreGoogleMapLink, StoreImage, StoreLatitude, StoreLongitude, StoreName } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class StoreEntity extends BaseEntity<StoreType> {
    constructor(values: StoreType, id?: Id) {
        super(values, StoreEntity.schema(), id)
    }

    static schema() {
        return z.strictObject({
            name: z.instanceof(StoreName, { error: ERROR_MESSAGES.entity.store.nameInstanceofError }),
            image: z.instanceof(StoreImage, { error: ERROR_MESSAGES.entity.store.imageInstanceofError }).optional(),
            latitude: z.instanceof(StoreLatitude, { error: ERROR_MESSAGES.entity.store.latitudeInstanceofError }).optional(),
            longitude: z.instanceof(StoreLongitude, { error: ERROR_MESSAGES.entity.store.longitudeInstanceofError }).optional(),
            googleMapLink: z.instanceof(StoreGoogleMapLink, { error: ERROR_MESSAGES.entity.store.googleMapLinkInstanceofError }).optional(),
            createdAt: z.instanceof(CreatedAt, { error: ERROR_MESSAGES.entity._share.createdAt }).optional(),
        })
    }

    set newValues(newValues: StoreUpdatableType) {
        this._values = this.validate({
            ...this._values, ...newValues
        }, StoreEntity.schema())
    }
}