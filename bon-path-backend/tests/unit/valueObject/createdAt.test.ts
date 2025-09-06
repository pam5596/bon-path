import { describe, expect, it } from "vitest";
import { CreatedAt } from "@valueObject";

describe("Id VOのテスト", () => {
    const value = new Date("2025-08-24T08:32:45.123Z")

    it('Dateが正であること', () => {
        expect(() => new CreatedAt(value)).not.toThrowError();
    })

    it('非Dateが不正であること', () => {
        expect(() => new CreatedAt(new Date("aaaaa"))).toThrowError();
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const createdAt = new CreatedAt(value);
        expect(createdAt.value).toBe(value);
    })

    it('equalsメソッドが同じ値のcreatedAtに対してtrueを返すこと', () => {
        const createdAt1 = new CreatedAt(value);
        const createdAt2 = new CreatedAt(value);
        expect(createdAt1.equals(createdAt2)).toBe(true);
    })
})