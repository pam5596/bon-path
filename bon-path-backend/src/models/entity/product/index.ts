import { z } from "zod";
import BaseEntity from "../_abstruct";
import { AsPrimitives } from "../_asPrimitives";
import { OptionalToNullable } from "../_optionalToNullable";
import type { ProductType } from "./type";
import { CreatedAt, Id, ProductImage, ProductLink, ProductName, ProductPrice } from "@models/valueObject";

export default class ProductEntity extends BaseEntity<ProductType> {
    constructor(valueObjects: ProductType & { id?: Id, createdAt?: CreatedAt }) {        
        const { id, createdAt, ...values } = valueObjects;
        super(values, ProductEntity.schema(), id, createdAt)
    }

    static schema() {
        return z.strictObject({
            storeId: z.instanceof(Id),
            categoryId: z.instanceof(Id),
            name: z.instanceof(ProductName),
            image: z.instanceof(ProductImage).optional(),
            link: z.instanceof(ProductLink).optional(),
            price: z.instanceof(ProductPrice)
        })
    }

    static fromPrimitives(primitives: OptionalToNullable<AsPrimitives<ProductType> & { id?: number, createdAt?: Date }>) {
        return new ProductEntity({
            id: primitives.id ? new Id(primitives.id) : undefined,
            createdAt: primitives.createdAt ? new CreatedAt(primitives.createdAt) : undefined,
            storeId: new Id(primitives.storeId),
            categoryId: new Id(primitives.categoryId),
            name: new ProductName(primitives.name),
            image: primitives.image ? new ProductImage(primitives.image) : undefined,
            link: primitives.link ? new ProductLink(primitives.link) : undefined,
            price: new ProductPrice(primitives.price)
        })
    }

    get storeId() {
        return this._values.storeId
    }

    get categoryId() {
        return this._values.categoryId
    }

    set newValues(newValues: Partial<Omit<ProductType, 'storeId'|'categoryId'>>) {
        this._values = this.validate({
            ...this._values, ...newValues
        }, ProductEntity.schema())
    }
}