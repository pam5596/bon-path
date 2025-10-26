import BaseModel from "./_abstract";

export interface Product {
    readonly id?: number;
    readonly storeId: number;
    categoryId: number;
    name: string;
    image?: string;
    link?: string;
    price: number;
    readonly createdAt?: Date;
}

export class ProductModel extends BaseModel<Product> {
    override setValues(values: Partial<Omit<Product,'id'|'storeId'|'createdAt'>>): void {
        this._values = {
            ...this._values,
            ...values
        }
    }

    get id() {
        return this._values.id
    }

    get storeId() {
        return this._values.storeId
    }

    get categoryId() {
        return this._values.categoryId
    }

    equals(other: this): boolean {
        return this.id === other.id
    }
}