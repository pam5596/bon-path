export function request(path: string, init?: RequestInit) {
    return fetch(
        `http://localhost:${process.env.PORT}` + path, init
    )
}