import { describe, expect, it } from 'vitest';
import { StoreModel } from '../../../models';

describe('StoreModelの単体テスト', () => { 
    const values = {
        id: 1,
        name: 'name',
        latitude: 45.0000,
        longitude: 90.0000,
        googleMapLink: 'googleMapLink',
        createdAt: new Date()
    }
    const store = new StoreModel(values)

    it('getValuesが値を返すこと', async () => {
        expect(store.getValues).toEqual(values)
    })

    it('idがIDを返すこと', async() => {
        expect(store.id).toEqual(values.id)
    })

    it('equalsが同じhashIdのモデルに対してtrueを返すこと', async () => {
        expect(store.equals(
            new StoreModel(values)
        )).toBe(true)

        expect(store.equals(
            new StoreModel({ ...values, id: 2 })
        )).toBe(false)
    })
})