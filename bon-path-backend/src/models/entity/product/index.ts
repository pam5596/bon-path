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
            storeId: z.instanceof(Id, { error: ERROR_MESSAGES.entity.product.storeIdInstanceofError }),
            categoryId: z.instanceof(Id, { error: ERROR_MESSAGES.entity.product.categoryIdInstanceofError }),
            name: z.instanceof(ProductName, { error: ERROR_MESSAGES.entity.product.nameInstanceofError }),
            image: z.instanceof(ProductImage, { error: ERROR_MESSAGES.entity.product.imageInstanceofError }),
            price: z.instanceof(ProductPrice, { error: ERROR_MESSAGES.entity.product.priceInstanceofError }),
            createdAt: z.instanceof(CreatedAt, { error: ERROR_MESSAGES.entity._share.createdAt }).optional()
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