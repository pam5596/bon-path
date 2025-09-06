import { describe, expect, it } from "vitest";
import { StoreLatitude } from "@valueObject";

describe("storeLatidude VOのテスト", () => {
    it('数値が正であること', () => {
        expect(() => new StoreLatitude(0)).not.toThrowError();
    })

    it('非数値が不正であること', () => {
        expect(() => new StoreLatitude("0")).toThrowError();
    })
    

    it('-90以上90以下であること', () => {
        expect(() => new StoreLatitude(-90.00001)).toThrowError();
        expect(() => new StoreLatitude(-90.00000)).not.toThrowError();
        expect(() => new StoreLatitude(90.00000)).not.toThrowError();
        expect(() => new StoreLatitude(90.00001)).toThrowError();
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const storeLatitude = new StoreLatitude(15.246);
        expect(storeLatitude.value).toBe(15.246);
    })

    it('equalsメソッドが同じ値のstoreLatidudeに対してtrueを返すこと', () => {
        const storeLatitude1 = new StoreLatitude(15.246);
        const storeLatitude2 = new StoreLatitude(15.246);
        expect(storeLatitude1.equals(storeLatitude2)).toBe(true);
    })
})
