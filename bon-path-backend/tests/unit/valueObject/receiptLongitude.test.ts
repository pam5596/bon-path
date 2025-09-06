import { describe, expect, it } from "vitest";
import { ReceiptLongitude } from "@valueObject";

describe("receiptLatidude VOのテスト", () => {
    it('数値が正であること', () => {
        expect(() => new ReceiptLongitude(0)).not.toThrowError();
    })

    it('非数値が不正であること', () => {
        expect(() => new ReceiptLongitude("0")).toThrowError();
    })

    it('-180以上180以下であること', () => {
        expect(() => new ReceiptLongitude(-180.00001)).toThrowError();
        expect(() => new ReceiptLongitude(-180.00000)).not.toThrowError();
        expect(() => new ReceiptLongitude(180.00000)).not.toThrowError();
        expect(() => new ReceiptLongitude(180.00001)).toThrowError();
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const receiptLongitude = new ReceiptLongitude(15.246);
        expect(receiptLongitude.value).toBe(15.246);
    })

    it('equalsメソッドが同じ値のreceiptLongitudeに対してtrueを返すこと', () => {
        const receiptLongitude1 = new ReceiptLongitude(15.246);
        const receiptLongitude2 = new ReceiptLongitude(15.246);
        expect(receiptLongitude1.equals(receiptLongitude2)).toBe(true);
    })
})
