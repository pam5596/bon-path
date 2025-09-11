import { z } from "zod";
import BaseEntity from "../_abstruct";
import type { ProductType, ProductUpdatableType } from "./type";
import { CreatedAt, Id, ProductImage, ProductName, ProductPrice } from "@models/valueObject";

export default class ProductEntity extends BaseEntity<ProductType> {
    constructor(values: ProductType, id?: Id, createdAt?: CreatedAt) {
        super(values, ProductEntity.schema(), id, createdAt)
    }

    static schema() {
        return z.strictObject({
            storeId: z.instanceof(Id),
            categoryId: z.instanceof(Id),
            name: z.instanceof(ProductName),
            image: z.instanceof(ProductImage).optional(),
            price: z.instanceof(ProductPrice)
        })
    }

    get storeId() {
        return this._values.storeId
    }

    get categoryId() {
        return this._values.categoryId
    }

    set newValues(newValues: Partial<ProductUpdatableType>) {
        this._values = this.validate({
            ...this._values, ...newValues
        }, ProductEntity.schema())
    }
}