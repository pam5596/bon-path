import { describe, expect, test } from "vitest";
import { request } from "./_request";
import { withTestFixtures } from "./_withTestFixtures";
import { prisma } from "@lib/clients";
import { createLoginSession } from "./_createLoginSession";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

describe('sessionLoginエンドポイントのシステムテスト', () => {
    withTestFixtures(prisma, false)

    test('[POST]sessionLogin ログインセッションIDをCookieで受け取れること', async () => {
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

    test('[POST]sessionLogin 存在しないユーザーではセッションを発行できないこと', async () => {
        const res = await request('/session/login', {
            method: 'POST',
            body: JSON.stringify({
                email: "incorrect@example.com",
                password: "abc123"
            }),
            redirect: "manual"
        })

        const body = await res.json()

        expect(res.status).toBe(404)
        expect(body.detail).toBe(ERROR_MESSAGES.usecase.userNotFound.detail)
    })

    test('[POST]sessionLogin パスワードが間違っていればセッションを発行できないこと', async () => {
        const res = await request('/session/login', {
            method: 'POST',
            body: JSON.stringify({
                email: "yamada@example.com",
                password: "incorrect"
            }),
            redirect: "manual"
        })

        const body = await res.json()

        expect(res.status).toBe(401)
        expect(body.detail).toBe(ERROR_MESSAGES.usecase.userPasswordIncorrect.detail)
    })

    test('[GET]sessionLogin セッションIDからユーザーIDを取得できること', async () => {
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

    test('[DELETE]sessionLogin ログインセッションが削除できること', async () => {
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