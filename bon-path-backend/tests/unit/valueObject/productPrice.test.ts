import { describe, expect, it } from "vitest";
import { ProductPrice } from "@valueObject";

describe("productPrice VOのテスト", () => {
    it('負の数が不正であること', () => {
        expect(() => new ProductPrice(-1)).toThrowError();
    })

    it('小数が不正であること', () => {
        expect(() => new ProductPrice(1.5)).toThrowError();
    })

    it('0以上であること', () => {
        expect(() => new ProductPrice(0)).not.toThrowError();
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const productPrice = new ProductPrice(150);
        expect(productPrice.value).toBe(150);
    })

    it('equalsメソッドが同じ値のProductPriceに対してtrueを返すこと', () => {
        const ProductPrice1 = new ProductPrice(150);
        const ProductPrice2 = new ProductPrice(150);
        expect(ProductPrice1.equals(ProductPrice2)).toBe(true);
    })
})