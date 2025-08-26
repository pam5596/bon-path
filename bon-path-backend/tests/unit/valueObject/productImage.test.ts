import { describe, expect, it } from "vitest";
import { ProductImage } from "@valueObject";

describe("productImage VOのテスト", () => {
    const value = "https://vitest.dev/"

    it('URL形式が正であること', () => {
        expect(() => new ProductImage(value)).not.toThrowError();
    })

    it('非URL形式が不正であること', () => {
        expect(() => new ProductImage("awrogniowr")).toThrowError();
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const productImage = new ProductImage(value);
        expect(productImage.value).toBe(value);
    })

    it('equalsメソッドが同じ値のProductImageに対してvalueを返すこと', () => {
        const ProductImage1 = new ProductImage(value);
        const ProductImage2 = new ProductImage(value);
        expect(ProductImage1.equals(ProductImage2)).toBe(true);
    })
})