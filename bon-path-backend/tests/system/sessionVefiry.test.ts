import { describe, expect, test } from "vitest";
import { createVerifySession } from "./_createVerifySession";
import { request } from "./_request";
import { withTestFixtures } from "./_withTestFixtures";
import { prisma } from "@lib/clients";

describe('sessionVerifyエンドポイントのシステムテスト', () => {
    withTestFixtures(prisma)

    test('[POST]sessionVerify', async () => {
        const res = await request(`/session/verify`, {
            method: 'POST',
            body: JSON.stringify({
                name: "name",
                email: "email@example.com",
                password: "password"
            }),
            redirect: "manual"
        });
                
        expect(res.status).toBe(302)
        expect(res.headers.getSetCookie()[0].includes('verifySessionId')).toBe(true)
        expect(res.headers.get('location')).toBe(process.env.FRONTEND_DOMAIN + '/signin/email-verify')
    })

    test('[GET]sessionVerify', async () => {
        const verifySessionId = await createVerifySession({
            name: "name",
            email: "email@example.com",
            password: "password"
        })

        const res = await request('/session/verify', {
            method: 'GET',
            headers: new Headers({
                'Cookie': verifySessionId
            })
        })

        const body = await res.json()

        expect(res.status).toBe(200)
        expect(body.userName).toBe('name')
        expect(body.userEmail).toBe('email@example.com')
    })
})