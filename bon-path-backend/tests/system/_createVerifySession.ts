import { request } from "./_request";

export async function createVerifySession(
    user: {
        name: string,
        email: string,
        password: string,
    }
) {
    const res = await request('/session/verify', {
        method: 'POST',
        body: JSON.stringify(user),
        redirect: 'manual'
    });

    return res.headers.getSetCookie()[0].split('; ')[0]
}