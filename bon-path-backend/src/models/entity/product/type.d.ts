import { ProductImage, ProductName, ProductPrice, Id } from "@models/valueObject";

export type ProductType = {
    readonly storeId: Id,
    readonly categoryId: Id,
    name: ProductName,
    image?: ProductImage,
    price: ProductPrice,
}

export type ProductUpdatableType = {
    name: ProductName,
    image: ProductImage,
    price: ProductPrice
}