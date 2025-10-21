import { describe, expect, test } from "vitest";
import { request } from "./_request";
import { withTestFixtures } from "./_withTestFixtures";
import { prisma } from "@lib/clients";
import { createLoginSession } from "./_createLoginSession";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { createVerifySession } from "./_createVerifySession";

describe('storesエンドポイントのシステムテスト', () => {
    withTestFixtures(prisma, false)

    test('[GET]getStores 店舗一覧を取得できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/stores', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(200)
        expect(body).toHaveProperty('stores')
        expect(body.stores.length).toBe(4)
    })

    test('[GET]getStores フィルタリングが機能すること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/stores?latitude=35.64693560971176&longitude=139.741831652267&radius=400&limit=2', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(200)
        expect(body).toHaveProperty('stores')
        expect(body.stores.length).toBe(2)
    })

    test('[POST]createStores 店舗を登録できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/stores', {
            method: 'POST',
            headers: new Headers({
                'Cookie': loginSessionId
            }),
            body: JSON.stringify({
                name: 'ＤＣＭ三田店'
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(201)
        expect(body).toHaveProperty('id')
    })

    test('[GET]getStore 店舗情報を取得できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/stores/1', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(200)
        expect(body).toHaveProperty('name')
    })

    test('[PATCH]updateStore 店舗情報を更新できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/stores/2', {
            method: 'PATCH',
            headers: new Headers({
                'Cookie': loginSessionId
            }),
            body: JSON.stringify({
                name: 'サミット 練馬店'
            })
        })
        
        expect(res.status).toBe(204)
    })

    test('[DELETE]deleteStore 店舗情報を削除できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/stores/3', {
            method: 'DELETE',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        expect(res.status).toBe(204)
    })

    test('[GET]getStoreProducts 店舗の商品舗情報を取得できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/stores/1/products', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(200)
        expect(body).toHaveProperty('products')
    })

    test('[GET]vectorSearchStore 店舗をベクトル検索できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/stores/vector-search?keyword=スーパーマーケット&limit=1', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(200)
        expect(body).toHaveProperty('stores')
        expect(body.stores.length).toBe(1)
    })

    test('[GET]googleMapSearchStore 店舗をGoogleマップで検索できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/stores/google-map-search?keyword=プラチナドンキ&limit=1', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        const body = await res.json()
        console.log(body)
        
        expect(res.status).toBe(200)
        expect(body).toHaveProperty('stores')
        expect(body.stores.length).toBe(1)
    })
})