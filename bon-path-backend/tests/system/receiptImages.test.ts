import { describe, expect, test } from "vitest";
import { request } from "./_request";
import { withTestFixtures } from "./_withTestFixtures";
import { prisma } from "@lib/clients";
import { createLoginSession } from "./_createLoginSession";
import { readFile } from "fs/promises";

describe('receiptsエンドポイントのシステムテスト', () => {
    withTestFixtures(prisma, false)

    test('[POST]putReceiptImage レシート画像を登録できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const file1 = await readFile('../../../share/fixtures/images/receipts/IMG_0045.JPG')
        const file1Blob = new Blob([new Uint8Array(file1)], { type: 'image/jpeg' })

        const file2 = await readFile('../../../share/fixtures/images/receipts/IMG_0046.JPG')
        const file2Blob = new Blob([new Uint8Array(file2)], { type: 'image/jpeg' })

        const form = new FormData()
        form.append('receiptId', "1")
        form.append('images', file1Blob, 'IMG_0045.JPG')
        form.append('images', file2Blob, 'IMG_0046.JPG')

        const res = await request('/receipt-images', {
            method: 'POST',
            headers: new Headers({
                'Cookie': loginSessionId
            }),
            body: form
        })

        expect(res.status).toBe(201)
    })

    test('[DELETE]deleteReceipt レシート画像を削除できること', async () => {
        const loginSessionId = await createLoginSession({
            email: "yamada@example.com",
            password: "abc123"
        })

        const res = await request('/receipt-images/1', {
            method: 'DELETE',
            headers: new Headers({
                'Cookie': loginSessionId
            })
        })
        
        expect(res.status).toBe(204)
    })

})