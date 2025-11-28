export function request(path: string, init?: RequestInit) {
    return fetch(
        `${process.env.BACKEND_DOMAIN}` + path, init
    )
}