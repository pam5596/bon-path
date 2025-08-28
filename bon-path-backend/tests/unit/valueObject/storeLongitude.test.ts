import { describe, expect, it } from "vitest";
import { StoreLongitude } from "@valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe("storeLatidude VOのテスト", () => {
    it('数値が正であること', () => {
        expect(() => new StoreLongitude(0)).not.toThrowError();
    })

    it('非数値が不正であること', () => {
        expect(() => new StoreLongitude("0")).toThrowError(ERROR_MESSAGES.valueObjects.storeLongitude.numberError);
    })

    it('-180以上180以下であること', () => {
        expect(() => new StoreLongitude(-180.00001)).toThrowError(ERROR_MESSAGES.valueObjects.storeLongitude.minError);
        expect(() => new StoreLongitude(-180.00000)).not.toThrowError();
        expect(() => new StoreLongitude(180.00000)).not.toThrowError();
        expect(() => new StoreLongitude(180.00001)).toThrowError(ERROR_MESSAGES.valueObjects.storeLongitude.maxError);
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const storeLongitude = new StoreLongitude(15.246);
        expect(storeLongitude.value).toBe(15.246);
    })

    it('equalsメソッドが同じ値のStoreLongitudeに対してtrueを返すこと', () => {
        const storeLongitude1 = new StoreLongitude(15.246);
        const storeLongitude2 = new StoreLongitude(15.246);
        expect(storeLongitude1.equals(storeLongitude2)).toBe(true);
    })
})
