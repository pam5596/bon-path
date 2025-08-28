import { describe, expect, it } from "vitest";
import { PurchasePrice } from "@valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe("purchasePrice VOのテスト", () => {
    it('負の数が不正であること', () => {
        expect(() => new PurchasePrice(-1)).toThrowError(ERROR_MESSAGES.valueObjects.purchasePrice.minError);
    })

    it('小数が不正であること', () => {
        expect(() => new PurchasePrice(1.5)).toThrowError(ERROR_MESSAGES.valueObjects.purchasePrice.intError);
    })

    it('0以上であること', () => {
        expect(() => new PurchasePrice(0)).not.toThrowError();
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const purchasePrice = new PurchasePrice(150);
        expect(purchasePrice.value).toBe(150);
    })

    it('equalsメソッドが同じ値のPurchasePriceに対してtrueを返すこと', () => {
        const PurchasePrice1 = new PurchasePrice(150);
        const PurchasePrice2 = new PurchasePrice(150);
        expect(PurchasePrice1.equals(PurchasePrice2)).toBe(true);
    })
})