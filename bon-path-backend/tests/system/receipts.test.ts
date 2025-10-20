import { describe, expect, test } from "vitest";
import { request } from "./_request";
import { withTestFixtures } from "./_withTestFixtures";
import { prisma } from "@lib/clients";
import { createLoginSession } from "./_createLoginSession";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { createVerifySession } from "./_createVerifySession";

describe('receiptsエンドポイントのシステムテスト', () => {
    withTestFixtures(prisma, true)

    test('[POST]createReceipt レシートを登録できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/receipts', {
            method: 'POST',
            headers: new Headers({
                'Cookie': loginSessionId
            }),
            body: JSON.stringify({
                latitude: 45.1234,
                longitude: 90.5678
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(201)
        expect(body).toHaveProperty('id')
    })

    test('[GET]getReceipt レシートを取得できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/receipts/1', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            }),
        })

        const body = await res.json()
        
        expect(res.status).toBe(200)
        expect(body).toHaveProperty('isChecked')
        expect(body).toHaveProperty('longitude')
        expect(body).toHaveProperty('latitude')
        expect(body).toHaveProperty('createdAt')
    })

    test('[PATCH]updateReceipt レシートを更新できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/receipts/2', {
            method: 'PATCH',
            headers: new Headers({
                'Cookie': loginSessionId
            }),
            body: JSON.stringify({
                isChecked: false
            })
        })
        
        expect(res.status).toBe(204)
    })

    test('[DELETE]deleteReceipt レシートを削除できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/receipts/2', {
            method: 'DELETE',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })
        
        expect(res.status).toBe(204)
    })

    test('[GET]getReceiptPurchases レシートの購入履歴を取得できる', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/receipts/2/purchases', {
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

    test.only('[GET]getReceiptImages レシートの画像を取得できる', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/receipts/2/images', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(200)
        expect(body).toHaveProperty('images')
        expect(body.images.length).toBe(1)
    })

})