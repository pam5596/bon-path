import BaseModel from "./_abstract";

export interface Receipt {
    readonly id: number;
    latitude: number;
    longitude: number;
    isChecked: boolean;
    readonly createdAt: Date;
}

export class ReceiptModel extends BaseModel<Receipt> {
    toggleIsChecked() {
        this._values = {
            ...this._values,
            isChecked: !this._values.isChecked
        }
    }

    get id() {
        return this._values.id
    }

    equals(other: this): boolean {
        return this.id === other.id
    }
}