export default abstract class BaseModel<T> {
    constructor(
        private _values: T
    ) {}

    get getValues() {
        return this._values
    }

    abstract setValues(values: Partial<T>): void

    abstract equals(other: BaseModel<T>): boolean
}