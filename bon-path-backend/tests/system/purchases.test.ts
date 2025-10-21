import { describe, expect, test } from "vitest";
import { request } from "./_request";
import { withTestFixtures } from "./_withTestFixtures";
import { prisma } from "@lib/clients";
import { createLoginSession } from "./_createLoginSession";

describe('purchasesエンドポイントのシステムテスト', () => {
    withTestFixtures(prisma, false)

    test('[POST]createPurchases 購入履歴を登録できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/purchases', {
            method: 'POST',
            headers: new Headers({
                'Cookie': loginSessionId
            }),
            body: JSON.stringify({
                purchases: [
                    {
                        receiptId: 1,
                        storeId: 1,
                        productId: 1,
                        price: 100,
                        quantity: 1
                    },
                    {
                        receiptId: 1,
                        storeId: 1,
                        productId: 2,
                        price: 200,
                        quantity: 2
                    }
                ]
            })
        })
        
        expect(res.status).toBe(201)
    })

    test('[GET]getPurchase 購入履歴を取得できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/purchases/1', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            }),
        })

        const body = await res.json()
        
        expect(res.status).toBe(200)
        expect(body).toHaveProperty('receiptId')
        expect(body).toHaveProperty('storeId')
        expect(body).toHaveProperty('productId')
        expect(body).toHaveProperty('price')
        expect(body).toHaveProperty('quantity')
    })

    test('[DELETE]deletePurchase 購入履歴を削除できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/purchases/2', {
            method: 'DELETE',
            headers: new Headers({
                'Cookie': loginSessionId
            }),
        })
        
        expect(res.status).toBe(204)
    })
})