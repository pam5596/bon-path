import { describe, expect, it } from "vitest";
import { ReceiptIsChecked } from "@valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe("receiptIsChecked VOのテスト", () => {
    it('真偽値が正であること', () => {
        expect(() => new ReceiptIsChecked(true)).not.toThrowError();
        expect(() => new ReceiptIsChecked(false)).not.toThrowError();
    })

    it('非真偽値が不正であること', () => {
        expect(() => new ReceiptIsChecked("true")).toThrowError(ERROR_MESSAGES.valueObjects.receiptIsChecked.booleanError);
        expect(() => new ReceiptIsChecked("false")).toThrowError(ERROR_MESSAGES.valueObjects.receiptIsChecked.booleanError);
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