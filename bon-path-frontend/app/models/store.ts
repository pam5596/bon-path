import BaseModel from "./_abstract";

export interface Store {
    readonly id?: number;
    name: string;
    image?: string;
    latitude?: number;
    longitude?: number;
    googleMapLink?: string;
    readonly createdAt?: Date;

    purchases?: PurchaseModel[]
}

export class StoreModel extends BaseModel<Store> {
    override setValues(values: Partial<Omit<Store,'id'|'createdAt'>>): void {
        this._values = {
            ...this._values,
            ...values
        }
    }

    get id() {
        return this._values.id
    }

    get purchases() {
        return this._values.purchases
    }

    get getModelValues() {
        const { purchases, ...values } = this._values
        return values
    }

    equals(other: this): boolean {
        return this.id === other.id
    }
}