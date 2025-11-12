import BaseModel from "./_abstract";

export interface ReceiptImage {
    readonly id?: number;
    url: string;
    readonly createdAt?: Date;
}

export class ReceiptImageModel extends BaseModel<ReceiptImage> {
    get id() {
        return this._values.id
    }

    equals(other: this): boolean {
        return this.id === other.id
    }
}