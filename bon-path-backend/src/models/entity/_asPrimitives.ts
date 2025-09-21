export type AsPrimitives<T> = {
    [K in keyof T]: NonNullable<T[K]> extends { value: infer V } ? V : never;
}