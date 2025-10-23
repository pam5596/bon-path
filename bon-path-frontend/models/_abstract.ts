export default abstract class BaseModel<T> {
    constructor(
        protected _values: T
    ) {}

    get getValues() {
        return this._values
    }

    setValues?(values: Partial<T>): void

    abstract equals(other: this): boolean
}