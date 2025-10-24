import { describe, expect, it } from 'vitest';
import { ReceiptModel } from '../../../models';

describe('ReceiptModelの単体テスト', () => { 
    const values = {
        id: 1,
        latitude: 45.0000,
        longitude: 90.0000,
        isChecked: false,
        createdAt: new Date()
    }
    const receipt = new ReceiptModel(values)

    it('getValuesが値を返すこと', async () => {
        expect(receipt.getValues).toEqual(values)
    })

    it('idがIDを返すこと', async() => {
        expect(receipt.id).toEqual(values.id)
    })

    it('equalsが同じIDのモデルに対してtrueを返すこと', async () => {
        expect(receipt.equals(
            new ReceiptModel(values)
        )).toBe(true)

        expect(receipt.equals(
            new ReceiptModel({ ...values, id: 2 })
        )).toBe(false)
    })
})