import { describe, expect, it } from "vitest";
import { ReceiptImageUrl } from "@valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe("receiptImageUrl VOのテスト", () => {
    const value = "https://vitest.dev/"

    it('URL形式が正であること', () => {
        expect(() => new ReceiptImageUrl(value)).not.toThrowError();
    })

    it('非URL形式が不正であること', () => {
        expect(() => new ReceiptImageUrl("awrogniowr")).toThrowError(ERROR_MESSAGES.valueObjects.receiptImageUrl.urlError);
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const receiptImageUrl = new ReceiptImageUrl(value);
        expect(receiptImageUrl.value).toBe(value);
    })

    it('equalsメソッドが同じ値のreceiptImageUrlに対してvalueを返すこと', () => {
        const receiptImageUrl1 = new ReceiptImageUrl(value);
        const receiptImageUrl2 = new ReceiptImageUrl(value);
        expect(receiptImageUrl1.equals(receiptImageUrl2)).toBe(true);
    })
})