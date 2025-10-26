import BaseModel from "./_abstract";

export interface User {
    readonly hashedId?: string;
    name: string;
    email: string;
    password?: string;
    readonly createdAt?: Date;
}

export class UserModel extends BaseModel<User> {
    override setValues(values: Partial<Omit<User, 'hashedId'|'createdAt'|'password'>>): void {
        this._values = {
            ...values,
            ...this._values
        }
    }

    get hashedId() {
        return this._values.hashedId
    }

    equals(other: this): boolean {
        return this.hashedId === other.hashedId
    }
}