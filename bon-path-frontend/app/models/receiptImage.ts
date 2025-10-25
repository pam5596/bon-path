import BaseModel from "./_abstract";

export interface ReceiptImage {
    readonly id: number;
    readonly receiptId: number;
    url: string;
    readonly createdAt: Date;
}

export class ReceiptImageModel extends BaseModel<ReceiptImage> {
    get id() {
        return this._values.id
    }

    get receiptId() {
        return this._values.receiptId
    }

    equals(other: this): boolean {
        return this.id === other.id
    }
}