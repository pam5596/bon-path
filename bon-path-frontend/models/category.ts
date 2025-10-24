import BaseModel from "./_abstract";

export interface Category {
    readonly id: number;
    readonly parentId: number;
    name: string;
}

export class CategoryModel extends BaseModel<Category> {
    get id() {
        return this._values.id
    }

    get parentId() {
        return this._values.parentId
    }

    equals(other: this): boolean {
        return this.id === other.id
    }
}