import { describe, expect, test } from "vitest";
import { request } from "./_request";
import { withTestFixtures } from "./_withTestFixtures";
import { prisma } from "@lib/clients";
import { createLoginSession } from "./_createLoginSession";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { createVerifySession } from "./_createVerifySession";

describe('productsエンドポイントのシステムテスト', () => {
    withTestFixtures(prisma, false)

    test('[GET]getProducts 商品一覧を取得できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/products', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(200)
        expect(body).toHaveProperty('products')
    })

    test('[GET]getProducts フィルタリングが機能すること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/products?sort=price&orderBy=asc&limit=3', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(200)
        expect(body).toHaveProperty('products')
    })

    test('[POST]createProducts 商品を登録できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/products', {
            method: 'POST',
            headers: new Headers({
                'Cookie': loginSessionId
            }),
            body: JSON.stringify({
                products: [
                    {
                        storeId: 4,
                        categoryId: 1,
                        name: 'NONIO 歯ブラシ',
                        image: 'https://nonio.lion.co.jp/img/modal/brush/pdt_typesharp_img_ava_l-jg.png',
                        link: 'https://nonio.lion.co.jp/lineup/brush.html',
                        price: 272
                    },
                    {
                        storeId: 4,
                        categoryId: 1,
                        name: 'GBパウダーデオスプレー',
                        image: 'https://item-shopping.c.yimg.jp/i/n/yyshop_4902806101621_i_20240614094439',
                        link: 'https://joshinweb.jp/cg/30001116/4902806101638.html',
                        price: 609
                    }
                ]
            })
        })
        
        expect(res.status).toBe(201)
    })

    test('[GET]getProduct 商品情報を取得できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/products/1', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(200)
        expect(body).toHaveProperty('name')
    })

    test('[PATCH]updateProduct 商品情報を更新できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/products/2', {
            method: 'PATCH',
            headers: new Headers({
                'Cookie': loginSessionId
            }),
            body: JSON.stringify({
                categoryId: 2,
                name: 'ちぢれ麺 200g',
                price: 100
            })
        })
        
        expect(res.status).toBe(204)
    })

    test('[DELETE]deleteProduct 商品情報を削除できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/products/3', {
            method: 'DELETE',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        expect(res.status).toBe(204)
    })

    test('[GET]vectorSearchProducts 商品をベクトル検索できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/products/vector-search?keyword=ラーメン系&storeId=1&limit=1', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(200)
        expect(body).toHaveProperty('products')
        expect(body.products.length).toBe(1)
    })

    test('[GET]googleSearchStore 商品をGoogleで検索できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/products/google-search?keyword=サントリークラフトボスブラック&limit=3', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(200)
        expect(body).toHaveProperty('products')
        expect(body.products.length).toBe(3)
    })
})