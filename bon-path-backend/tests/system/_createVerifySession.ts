import { OpenAPIHono } from "@hono/zod-openapi";

export async function createVerifySession(
    app: OpenAPIHono,
    user: {
        name: string,
        email: string,
        password: string,
    }, 
    secret: string
) {
    const res = await app.request('/session/verify', {
        method: 'POST',
        body: JSON.stringify(user)
    });

    return res.headers.getSetCookie()[0].split('; ')[0]
}