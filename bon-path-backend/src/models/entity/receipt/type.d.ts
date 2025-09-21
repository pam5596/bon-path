import { ReceiptIsChecked, ReceiptLatitude, ReceiptLongitude, Id, CreatedAt } from "@models/valueObject";

export type ReceiptType = {
    readonly userId: Id
    isChecked: ReceiptIsChecked
    latitude: ReceiptLatitude
    longitude: ReceiptLongitude
}