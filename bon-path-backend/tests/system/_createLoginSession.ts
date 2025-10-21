import { request } from "./_request";

export async function createLoginSession(
    user: {
        email: string,
        password: string,
    }
) {
    const res = await request('/session/login', {
        method: 'POST',
        body: JSON.stringify(user),
        redirect: 'manual'
    });

    return res.headers.getSetCookie()[0].split('; ')[0]
}