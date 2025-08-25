import { describe, expect, it } from "vitest";
import { ReceiptLatitude } from "@valueObject";

describe("receiptLatidude VOのテスト", () => {
    it('数値が正であること', () => {
        expect(() => new ReceiptLatitude(0)).not.toThrowError();
    })

    it('-90以上90以下であること', () => {
        expect(() => new ReceiptLatitude(-90.00001)).toThrowError();
        expect(() => new ReceiptLatitude(-90.00000)).not.toThrowError();
        expect(() => new ReceiptLatitude(90.00000)).not.toThrowError();
        expect(() => new ReceiptLatitude(90.00001)).toThrowError();
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const receiptLatitude = new ReceiptLatitude(15.246);
        expect(receiptLatitude.value).toBe(15.246);
    })

    it('equalsメソッドが同じ値のreceiptLatidudeに対してtrueを返すこと', () => {
        const receiptLatitude1 = new ReceiptLatitude(15.246);
        const receiptLatitude2 = new ReceiptLatitude(15.246);
        expect(receiptLatitude1.equals(receiptLatitude2)).toBe(true);
    })
})
