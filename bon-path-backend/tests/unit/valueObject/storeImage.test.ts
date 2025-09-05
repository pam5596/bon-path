import { describe, expect, it } from "vitest";
import { StoreImage } from "@valueObject";

describe("storeImage VOのテスト", () => {
    const value = "https://vitest.dev/"

    it('URL形式が正であること', () => {
        expect(() => new StoreImage(value)).not.toThrowError();
    })

    it('非URL形式が不正であること', () => {
        expect(() => new StoreImage("awrogniowr")).toThrowError();
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const storeImage = new StoreImage(value);
        expect(storeImage.value).toBe(value);
    })

    it('equalsメソッドが同じ値のstoreImageに対してvalueを返すこと', () => {
        const storeImage1 = new StoreImage(value);
        const storeImage2 = new StoreImage(value);
        expect(storeImage1.equals(storeImage2)).toBe(true);
    })
})