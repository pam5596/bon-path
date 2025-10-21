export type PayloadType = {
    body?:      Record<string, unknown>,
    params?:    Record<string, number>,
    query?:     Record<string, string|number|boolean>,
    cookies?:   Record<string, string>
}