import { describe, expect, test } from "vitest";
import { request } from "./_request";
import { withTestFixtures } from "./_withTestFixtures";
import { prisma } from "@lib/clients";
import { createLoginSession } from "./_createLoginSession";

describe('sessionLoginエンドポイントのシステムテスト', () => {
    withTestFixtures(prisma)

    test('[POST]sessionLogin', async () => {
        const res = await request('/session/login', {
            method: 'POST',
            body: JSON.stringify({
                email: "yamada@example.com",
                password: "abc123"
            }),
            redirect: "manual"
        })

        expect(res.status).toBe(302)
        expect(res.headers.getSetCookie()[0].includes('loginSessionId'))
        expect(res.headers.get('location')).toBe(process.env.FRONTEND_DOMAIN + '/dashboard')
    })

    test('[GET]sessionLogin', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/session/login', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        const body = await res.json()

        expect(res.status).toBe(200)
        expect(body).toHaveProperty('userHashId')
    })

    test('[DELETE]sessionLogin', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/session/login', {
            method: 'DELETE',
            headers: new Headers({
                'Cookie': loginSessionId
            }),
            redirect: "manual"
        })

        expect(res.status).toBe(302)
        expect(res.headers.getSetCookie()[0].includes(loginSessionId)).toBe(false)
        expect(res.headers.get('location')).toBe(process.env.FRONTEND_DOMAIN + '/signup')
    })
})