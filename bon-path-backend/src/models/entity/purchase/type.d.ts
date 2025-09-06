import { PurchasePrice, PurchaseQuantity, CreatedAt, Id } from "@models/valueObject";

export type PurchaseType = {
    readonly userId: Id,
    readonly receiptId: Id,
    readonly storeId: Id,
    readonly productId: Id,
    quantity: PurchaseQuantity,
    price: PurchasePrice,
    readonly createdAt?: CreatedAt
}