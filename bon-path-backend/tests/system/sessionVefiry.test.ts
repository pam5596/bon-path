import { describe, expect, test } from "vitest";
import { createVerifySession } from "./_createVerifySession";
import { request } from "./_request";
import { withTestFixtures } from "./_withTestFixtures";
import { prisma } from "@lib/clients";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

describe('sessionVerifyエンドポイントのシステムテスト', () => {
    withTestFixtures(prisma, false)

    test('[POST]sessionVerify メアド確認セッションIDをCookieで受け取れること', async () => {
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

    test('[POST]sessionVerify 既存のEmailはセッションを発行できないこと。', async () => {
        const res = await request(`/session/verify`, {
            method: 'POST',
            body: JSON.stringify({
                name: "name",
                email: "yamada@example.com",
                password: "password"
            }),
            redirect: "manual"
        });
        
        const body = await res.json()

        expect(res.status).toBe(409)
        expect(body.detail).toBe(ERROR_MESSAGES.usecase.userConflict.detail)
    })

    test('[GET]sessionVerify セッションIDからユーザー情報を取得できること', async () => {
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

    test('[GET]sessionVerify 存在しないセッションIDは認証不可であること', async () => {
        const res = await request('/session/verify', {
            method: 'GET',
            headers: new Headers({
                'Cookie': 'verifySessionId=incorrectSessionId;'
            })
        })

        const body = await res.json()

        expect(res.status).toBe(401)
        expect(body.detail).toBe(ERROR_MESSAGES.client.honoJwt)
    })
})