import { describe, expect, test } from "vitest";
import { request } from "./_request";
import { withTestFixtures } from "./_withTestFixtures";
import { prisma } from "@lib/clients";
import { createLoginSession } from "./_createLoginSession";

describe('categoriesエンドポイントのシステムテスト', () => {
    withTestFixtures(prisma, false)

    test('[POST]createCategories 商品カテゴリーを登録できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/categories', {
            method: 'POST',
            headers: new Headers({
                'Cookie': loginSessionId
            }),
            body: JSON.stringify({
                categories: [
                    {
                        parentId: 1,
                        name: '果物',
                    },
                    {
                        name: '家電製品',
                    }
                ]
            })
        })
        
        expect(res.status).toBe(201)
    })

    test('[GET]getCategory 商品カテゴリーを取得できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/categories/1', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            }),
        })

        const body = await res.json()
        
        expect(res.status).toBe(200)
        expect(body).toHaveProperty('name')
    })

    test('[DELETE]deleteCategory 商品カテゴリーを削除できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/categories/2', {
            method: 'DELETE',
            headers: new Headers({
                'Cookie': loginSessionId
            }),
        })
        
        expect(res.status).toBe(204)
    })

    test('[GET]getCategoryChildren カテゴリーの子カテゴリーを取得できる', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/categories/1/children', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(200)
        expect(body).toHaveProperty('categories')
    })

    test('[GET]getCategoryProducts カテゴリーの商品一覧を取得できる', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/categories/1/products', {
            method: 'GET',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })

        const body = await res.json()
        
        expect(res.status).toBe(200)
        expect(body).toHaveProperty('products')
    })
})