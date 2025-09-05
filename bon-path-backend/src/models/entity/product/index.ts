import { z } from "zod";
import BaseEntity from "../_abstruct";
import type { ProductType, ProductUpdatableType } from "./type";
import { CreatedAt, Id, ProductImage, ProductName, ProductPrice } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class ProductEntity extends BaseEntity<ProductType> {
    constructor(values: ProductType, id?: Id) {
        super(values, ProductEntity.schema(), id)
    }

    static schema() {
        return z.strictObject({
            storeId: z.instanceof(Id),
            categoryId: z.instanceof(Id),
            name: z.instanceof(ProductName),
            image: z.instanceof(ProductImage).optional(),
            price: z.instanceof(ProductPrice),
            createdAt: z.instanceof(CreatedAt).optional()
        })
    }

    get storeId() {
        return this._values.storeId
    }

    get categoryId() {
        return this._values.categoryId
    }

    set newValues(newValues: ProductUpdatableType) {
        this._values = this.validate({
            ...this._values, ...newValues
        }, ProductEntity.schema())
    }
}