import { ReceiptImageUrl, Id, CreatedAt } from "@models/valueObject";

export type ReceiptImageType = {
    readonly receiptId: Id
    url: ReceiptImageUrl
    readonly createdAt?: CreatedAt
}