import { describe, expect, test } from "vitest";
import { request } from "./_request";
import { withTestFixtures } from "./_withTestFixtures";
import { prisma } from "@lib/clients";
import { createLoginSession } from "./_createLoginSession";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { createVerifySession } from "./_createVerifySession";

describe('usersエンドポイントのシステムテスト', () => {
    withTestFixtures(prisma, true)

    test('[POST]createUser ユーザーを登録できること', async () => {
        const verifySessionId = await createVerifySession({
            name: 'test',
            email: 'test@example.com',
            password: 'test123'
        })

        const res = await request('/users', {
            method: 'POST',
            headers: new Headers({
                'Cookie': verifySessionId
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(201)
        expect(body).toHaveProperty('hashedId')
    })

    test('[POST]createUser 不正なセッションの場合は登録できないこと', async () => {
        const res = await request('/users', {
            method: 'POST',
            headers: new Headers({
                'Cookie': 'verifySessionId=incorrect;'
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(401)
        expect(body.detail).toBe(ERROR_MESSAGES.client.honoJwt)
    })

    test('[GET]getUser ユーザーを取得できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/users', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(200)
        expect(body.email).toBe("yamada@example.com")
    })

    test('[GET]getUser 不正なセッションの場合は取得できないこと', async () => {
        const res = await request('/users', {
            method: 'GET',
            headers: new Headers({
                'Cookie': 'loginSessionId=incorrect;'
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(401)
        expect(body.detail).toBe(ERROR_MESSAGES.client.honoJwt)
    })

    test('[PATCH]updateUser ユーザー情報を更新できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "saito@example.com",
            password: "def456"
        })

        const res = await request('/users', {
            method: 'PATCH',
            headers: new Headers({
                'Cookie': loginSessionId
            }),
            body: JSON.stringify({
                name: 'Kyouko Saito',
                email: 'kyoko123@example.com'
            })
        })
        
        expect(res.status).toBe(204)
    })

    test('[DELETE]deleteUser ユーザー情報を削除できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "tanaka@example.com",
            password: "hij789"
        })

        const res = await request('/users', {
            method: 'DELETE',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })
        
        expect(res.status).toBe(204)
    })

    test('[GET]getUserReceipt ユーザーのレシート一覧を取得できる', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/users/receipts', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(200)
        expect(body).toHaveProperty('receipts')
        expect(body.receipts.length).toBe(2)
    })

    test('[GET]getUserReceipt isCheckedフィルターが機能すること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/users/receipts?isChecked=false', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(200)
        expect(body.receipts.length).toBe(1)
    })

    test('[GET]getUserPurchases ユーザーの購入履歴一覧を取得できる', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/users/purchases', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(200)
        expect(body).toHaveProperty('purchases')
        expect(body.purchases.length).toBe(2)
    })
})