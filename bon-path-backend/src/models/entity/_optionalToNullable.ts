export type OptionalToNullable<T> = {
    [K in keyof T]: undefined extends T[K] ? T[K] | null : T[K];
};
