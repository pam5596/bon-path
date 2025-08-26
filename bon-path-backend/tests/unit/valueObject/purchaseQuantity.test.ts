import { describe, expect, it } from "vitest";
import { PurchaseQuantity } from "@valueObject";

describe("purchaseQuantity VOのテスト", () => {
    it('負の数が不正であること', () => {
        expect(() => new PurchaseQuantity(-1)).toThrowError();
    })

    it('小数が不正であること', () => {
        expect(() => new PurchaseQuantity(1.5)).toThrowError();
    })

    it('1以上であること', () => {
        expect(() => new PurchaseQuantity(1)).not.toThrowError();
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const purchaseQuantity = new PurchaseQuantity(150);
        expect(purchaseQuantity.value).toBe(150);
    })

    it('equalsメソッドが同じ値のPurchaseQuantityに対してtrueを返すこと', () => {
        const PurchaseQuantity1 = new PurchaseQuantity(150);
        const PurchaseQuantity2 = new PurchaseQuantity(150);
        expect(PurchaseQuantity1.equals(PurchaseQuantity2)).toBe(true);
    })
})