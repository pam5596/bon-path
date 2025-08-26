import { describe, expect, it } from "vitest";
import { ProductName } from "@valueObject";

describe("ProductName VOのテスト", () => {
    it('空文字が不正であること', () => {
        expect(() => new ProductName("")).toThrowError();
    })

    it('1文字以上であること', () => {
        expect(() => new ProductName("a".repeat(1))).not.toThrowError();
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const productName = new ProductName("ProductName");
        expect(productName.value).toBe("ProductName");
    })

    it('equalsメソッドが同じ値のProductNameに対してtrueを返すこと', () => {
        const ProductName1 = new ProductName("ProductName");
        const ProductName2 = new ProductName("ProductName");
        expect(ProductName1.equals(ProductName2)).toBe(true);
    })
})