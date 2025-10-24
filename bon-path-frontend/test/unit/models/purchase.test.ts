import { describe, expect, it } from 'vitest';
import { PurchaseModel } from '../../../models';

describe('PurchaseModelの単体テスト', () => {
    const values = {
        id: 1,
        storeId: 2,
        receiptId: 3,
        productId: 4,
        quantity: 5,
        price: 100,
        createdAt: new Date()
    }
    const product = new PurchaseModel(values)

    it('getValuesが値を返すこと', async () => {
        expect(product.getValues).toEqual(values)
    })

    it('idがIDを返すこと', async() => {
        expect(product.id).toEqual(values.id)
    })

    it('storeIdが店舗IDを返すこと', async() => {
        expect(product.storeId).toEqual(values.storeId)
    })

    it('receiptIdがレシートIDを返すこと', async() => {
        expect(product.receiptId).toEqual(values.receiptId)
    })

    it('productIdが商品IDを返すこと', async() => {
        expect(product.productId).toEqual(values.productId)
    })

    it('equalsが同じIDのモデルに対してtrueを返すこと', async () => {
        expect(product.equals(
            new PurchaseModel(values)
        )).toBe(true)

        expect(product.equals(
            new PurchaseModel({ ...values, id: 2 })
        )).toBe(false)
    })
})