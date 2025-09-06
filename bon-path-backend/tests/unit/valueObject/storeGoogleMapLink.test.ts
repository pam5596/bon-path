import { describe, expect, it } from "vitest";
import { StoreGoogleMapLink } from "@valueObject";

describe("storeGoogleMapLink VOのテスト", () => {
    const value = "https://vitest.dev/"

    it('URL形式が正であること', () => {
        expect(() => new StoreGoogleMapLink(value)).not.toThrowError();
    })

    it('非URL形式が不正であること', () => {
        expect(() => new StoreGoogleMapLink("awrogniowr")).toThrowError();
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const storeGoogleMapLink = new StoreGoogleMapLink(value);
        expect(storeGoogleMapLink.value).toBe(value);
    })

    it('equalsメソッドが同じ値のStoreGoogleMapLinkに対してvalueを返すこと', () => {
        const storeGoogleMapLink1 = new StoreGoogleMapLink(value);
        const storeGoogleMapLink2 = new StoreGoogleMapLink(value);
        expect(storeGoogleMapLink1.equals(storeGoogleMapLink2)).toBe(true);
    })
})