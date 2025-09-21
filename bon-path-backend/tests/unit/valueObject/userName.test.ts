import { describe, expect, it } from "vitest";
import { UserName } from "@valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe("userName VOのテスト", () => {
    it('非文字列が不正であること', () => {
        expect(() => new UserName(123)).toThrowError();
    })

    it('1文字以上30文字以下であること', () => {
        expect(() => new UserName("a".repeat(31))).toThrowError(ERROR_MESSAGES.valueObjects.userName.maxError);
        expect(() => new UserName("a".repeat(30))).not.toThrowError();
        expect(() => new UserName("a".repeat(1))).not.toThrowError();
        expect(() => new UserName("")).toThrowError(ERROR_MESSAGES.valueObjects.userName.minError);
    })

    it('空白文字が不正であること', () => {
        expect(() => new UserName("   ")).toThrowError(ERROR_MESSAGES.valueObjects.userName.emptyError);
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const userName = new UserName("TestUser");
        expect(userName.value).toBe("TestUser");
    })

    it('equalsメソッドが同じ値のUserNameに対してtrueを返すこと', () => {
        const userName1 = new UserName("TestUser");
        const userName2 = new UserName("TestUser");
        expect(userName1.equals(userName2)).toBe(true);
    })
})