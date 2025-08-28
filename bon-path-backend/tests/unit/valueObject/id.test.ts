import { describe, expect, it } from "vitest";
import { Id } from "@valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe("Id VOのテスト", () => {
    it('負の数が不正であること', () => {
        expect(() => new Id(-1)).toThrowError(ERROR_MESSAGES.valueObjects.id.minError);
    })
    
    it('0が不正であること', () => {
        expect(() => new Id(0)).toThrowError(ERROR_MESSAGES.valueObjects.id.minError);
    })

    it('小数が不正であること', () => {
        expect(() => new Id(1.5)).toThrowError(ERROR_MESSAGES.valueObjects.id.intError);
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