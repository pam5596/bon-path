import { describe, expect, test } from "vitest";
import { request } from "./_request";
import { withTestFixtures } from "./_withTestFixtures";
import { prisma } from "@lib/clients";
import { createLoginSession } from "./_createLoginSession";

describe('gptOcrエンドポイントのシステムテスト', () => {
    withTestFixtures(prisma, false)

    test('[POST]gptOcr レシート画像をOCR分析できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/gpt-ocr', {
            method: 'POST',
            headers: new Headers({
                'Cookie': loginSessionId
            }),
            body: JSON.stringify({
                images: [
                    '/receipts/IMG_0034.JPG?raw=true'
                ]
            })
        })

        const body = await res.json()

        expect(res.status).toBe(200)
        expect(body).toHaveProperty('store')
        expect(body).toHaveProperty('products')
    })
})