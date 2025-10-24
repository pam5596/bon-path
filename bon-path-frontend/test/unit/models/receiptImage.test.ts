import { describe, expect, it } from 'vitest';
import { ReceiptImageModel } from '../../../models';

describe('ReceiptImageModelの単体テスト', () => { 
    const values = {
        id: 1,
        receiptId: 2,
        url: 'url',
        createdAt: new Date()
    }
    const receiptImage = new ReceiptImageModel(values)

    it('getValuesが値を返すこと', async () => {
        expect(receiptImage.getValues).toEqual(values)
    })

    it('idがIDを返すこと', async() => {
        expect(receiptImage.id).toEqual(values.id)
    })

    it('receiptIdがレシートIDを返すこと', async() => {
        expect(receiptImage.receiptId).toEqual(values.receiptId)
    })

    it('equalsが同じIDのモデルに対してtrueを返すこと', async () => {
        expect(receiptImage.equals(
            new ReceiptImageModel(values)
        )).toBe(true)

        expect(receiptImage.equals(
            new ReceiptImageModel({ ...values, id: 2 })
        )).toBe(false)
    })
})