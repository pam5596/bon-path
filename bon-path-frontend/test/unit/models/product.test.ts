import { describe, expect, it } from 'vitest';
import { ProductModel } from '../../../app/models';

describe('ProductModelの単体テスト', () => {
    const values = {
        id: 1,
        storeId: 2,
        categoryId: 3,
        name: 'name',
        image: 'image',
        link: 'link',
        price: 100,
        createdAt: new Date()
    }
    const product = new ProductModel(values)

    it('getValuesが値を返すこと', async () => {
        expect(product.getValues).toEqual(values)
    })

    it('idがIDを返すこと', async() => {
        expect(product.id).toEqual(values.id)
    })

    it('storeIdが店舗IDを返すこと', async() => {
        expect(product.storeId).toEqual(values.storeId)
    })

    it('categoryIdが商品カテゴリーIDを返すこと', async() => {
        expect(product.categoryId).toEqual(values.categoryId)
    })

    it('equalsが同じIDのモデルに対してtrueを返すこと', async () => {
        expect(product.equals(
            new ProductModel(values)
        )).toBe(true)

        expect(product.equals(
            new ProductModel({ ...values, id: 2 })
        )).toBe(false)
    })
})