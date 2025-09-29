import { describe, expect, it } from "vitest";
import { ProductLink } from "@valueObject";

describe("productLink VOのテスト", () => {
    const value = "https://vitest.dev/"

    it('URL形式が正であること', () => {
        expect(() => new ProductLink(value)).not.toThrowError();
    })

    it('非URL形式が不正であること', () => {
        expect(() => new ProductLink("awrogniowr")).toThrowError();
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const productLink = new ProductLink(value);
        expect(productLink.value).toBe(value);
    })

    it('equalsメソッドが同じ値のProductLinkに対してvalueを返すこと', () => {
        const ProductLink1 = new ProductLink(value);
        const ProductLink2 = new ProductLink(value);
        expect(ProductLink1.equals(ProductLink2)).toBe(true);
    })
})