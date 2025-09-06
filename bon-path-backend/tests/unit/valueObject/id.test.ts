import { describe, expect, it } from "vitest";
import { Id } from "@valueObject";

describe("Id VOのテスト", () => {
    it('負の数が不正であること', () => {
        expect(() => new Id(-1)).toThrowError();
    })
    
    it('0が不正であること', () => {
        expect(() => new Id(0)).toThrowError();
    })

    it('小数が不正であること', () => {
        expect(() => new Id(1.5)).toThrowError();
    })

    it('1が正であること', () => {
        expect(() => new Id(1)).not.toThrowError();
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const id = new Id(5);
        expect(id.value).toBe(5);
    })

    it('equalsメソッドが同じ値のIdに対してtrueを返すこと', () => {
        const id1 = new Id(10);
        const id2 = new Id(10);
        expect(id1.equals(id2)).toBe(true);
    })
})