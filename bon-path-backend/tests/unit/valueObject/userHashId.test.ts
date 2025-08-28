import { describe, expect, it } from "vitest";
import { UserHashId } from "@valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe("userHashId VOのテスト", () => {
    it('非cuidが不正であること', () => {
        expect(() => new UserHashId("invalid-cuid")).toThrowError(ERROR_MESSAGES.valueObjects.userHashId.cuidError);
    })

    it('cuid形式が正であること', () => {
        expect(() => new UserHashId("cjr4j6g6g0000qzrmn0g1v6xv")).not.toThrowError();
    })

    it('valueメソッドが与えられた値を返すこと'), () => {
        const userHashId = new UserHashId("cjr4j6g6g0000qzrmn0g1v6xv");
        expect(userHashId.value).toBe("cjr4j6g6g0000qzrmn0g1v6xv");
    }

    it('equalsメソッドが同じ値のUserHashIdに対してtrueを返すこと', () => {
        const userHashId1 = new UserHashId("cjr4j6g6g0000qzrmn0g1v6xv");
        const userHashId2 = new UserHashId("cjr4j6g6g0000qzrmn0g1v6xv");
        expect(userHashId1.equals(userHashId2)).toBe(true);
    })
})