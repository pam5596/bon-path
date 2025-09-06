import { ProductImage, ProductName, ProductPrice, Id, CreatedAt } from "@models/valueObject";

export type ProductType = {
    readonly storeId: Id,
    readonly categoryId: Id,
    name: ProductName,
    image?: ProductImage,
    price: ProductPrice,
    readonly createdAt?: CreatedAt
}

export type ProductUpdatableType = {
    name: ProductName,
    image: ProductImage,
    price: ProductPrice
}