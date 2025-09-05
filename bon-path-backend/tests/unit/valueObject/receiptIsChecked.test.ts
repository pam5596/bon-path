import { describe, expect, it } from "vitest";
import { ReceiptIsChecked } from "@valueObject";

describe("receiptIsChecked VOのテスト", () => {
    it('真偽値が正であること', () => {
        expect(() => new ReceiptIsChecked(true)).not.toThrowError();
        expect(() => new ReceiptIsChecked(false)).not.toThrowError();
    })

    it('非真偽値が不正であること', () => {
        expect(() => new ReceiptIsChecked("true")).toThrowError();
        expect(() => new ReceiptIsChecked("false")).toThrowError();
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const receiptIsChecked = new ReceiptIsChecked(true);
        expect(receiptIsChecked.value).toBe(true);
    })

    it('equalsメソッドが同じ値のreceiptIsCheckedに対してtrueを返すこと', () => {
        const receiptIsChecked1 = new ReceiptIsChecked(true);
        const receiptIsChecked2 = new ReceiptIsChecked(true);
        expect(receiptIsChecked1.equals(receiptIsChecked2)).toBe(true);
    })
})