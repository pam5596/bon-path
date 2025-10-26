import { describe, expect, it } from 'vitest';
import { CategoryModel } from '../../../app/models';

describe('CategoryModelの単体テスト', () => { 
    const values = {
        id: 1,
        parentId: 2,
        name: 'name',
        createdAt: new Date()
    }
    const category = new CategoryModel(values)

    it('getValuesが値を返すこと', async () => {
        expect(category.getValues).toEqual(values)
    })

    it('idがIDを返すこと', async() => {
        expect(category.id).toEqual(values.id)
    })

    it('parentIdが親カテゴリーのIDを返すこと', async() => {
        expect(category.parentId).toEqual(values.parentId)
    })

    it('equalsが同じIDdのモデルに対してtrueを返すこと', async () => {
        expect(category.equals(
            new CategoryModel(values)
        )).toBe(true)

        expect(category.equals(
        new CategoryModel({ ...values, id: 2 })
    )).toBe(false)
    })
})