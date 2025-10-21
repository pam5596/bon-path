import { z } from "zod";
import BaseEntity from "../_abstruct";
import { AsPrimitives } from "../_asPrimitives";
import { OptionalToNullable } from "../_optionalToNullable";
import type { StoreType } from "./type";
import { CreatedAt, Id, StoreGoogleMapLink, StoreImage, StoreLatitude, StoreLongitude, StoreName } from "@models/valueObject";

export default class StoreEntity extends BaseEntity<StoreType> {
    constructor(valueObjects: StoreType & { id?: Id, createdAt?: CreatedAt }) {
        const { id, createdAt, ...values } = valueObjects;
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

    static fromPrimitives(primitives: OptionalToNullable<AsPrimitives<StoreType> & { id?: number, createdAt?: Date }>) {
        return new StoreEntity({
            id: primitives.id ? new Id(primitives.id) : undefined,
            createdAt: primitives.createdAt ? new CreatedAt(primitives.createdAt) : undefined,
            name: new StoreName(primitives.name),
            image: primitives.image ? new StoreImage(primitives.image) : undefined,
            latitude: primitives.latitude ? new StoreLatitude(primitives.latitude!) : undefined,
            longitude: primitives.longitude ? new StoreLongitude(primitives.longitude!) : undefined,
            googleMapLink: primitives.googleMapLink ? new StoreGoogleMapLink(primitives.googleMapLink) : undefined
        })
    }

    set newValues(newValues: Partial<Omit<StoreType, 'name'>>) {
        this._values = this.validate({
            ...this._values, ...newValues
        }, StoreEntity.schema())
    }
}