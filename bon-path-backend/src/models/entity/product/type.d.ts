import { ProductImage, ProductName, ProductPrice, Id, ProductLink } from "@models/valueObject";

export type ProductType = {
    readonly storeId: Id,
    readonly categoryId: Id,
    name: ProductName,
    image?: ProductImage,
    link?: ProductLink,
    price: ProductPrice,
}