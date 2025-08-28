import { describe, expect, it } from "vitest";
import { StoreName } from "@valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe("storeName VOのテスト", () => {
    it('非文字列が不正であること', () => {
        expect(() => new StoreName(123)).toThrowError(ERROR_MESSAGES.valueObjects.storeName.stringError);
    })

    it('空文字が不正であること', () => {
        expect(() => new StoreName("")).toThrowError(ERROR_MESSAGES.valueObjects.storeName.minError);
    })

    it('1文字以上であること', () => {
        expect(() => new StoreName("a".repeat(1))).not.toThrowError();
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const storeName = new StoreName("StoreName");
        expect(storeName.value).toBe("StoreName");
    })

    it('equalsメソッドが同じ値のstoreNameに対してtrueを返すこと', () => {
        const storeName1 = new StoreName("StoreName");
        const storeName2 = new StoreName("StoreName");
        expect(storeName1.equals(storeName2)).toBe(true);
    })
})