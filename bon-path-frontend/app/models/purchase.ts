import BaseModel from "./_abstract";

export interface Purchase {
    readonly id?: number;
    readonly receiptId: number;
    readonly storeId: number;
    readonly productId: number;
    quantity: number;
    price: number;
    readonly createdAt?: Date;

    product?: ProductModel
}

export class PurchaseModel extends BaseModel<Purchase> {
    get id() {
        return this._values.id
    }

    get receiptId() {
        return this._values.receiptId
    }

    get storeId() {
        return this._values.storeId
    }

    get productId() {
        return this._values.productId
    }

    get product() {
        return this._values.product
    }

    equals(other: this): boolean {
        return this.id === other.id
    }
}