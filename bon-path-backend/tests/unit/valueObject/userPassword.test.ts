import { describe, expect, it } from "vitest";
import { UserPassword } from "@valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe("userPassword VOのテスト", () => {
    it('非文字列が不正であること', () => {
        expect(() => new UserPassword(123)).toThrowError();
    })

    it('半角英数字の文字列が正であること', () => {
        expect(() => new UserPassword("abcDEF123")).not.toThrowError();
    })

    it('非半角英数字の文字列が不正であること', () => {
        expect(() => new UserPassword("あいうアイウ阿胃得")).toThrowError(ERROR_MESSAGES.valueObjects.userPassword.regexError);
    })

    it('6文字以上32文字以下がであること', () => {
        expect(() => new UserPassword("a".repeat(33))).toThrowError(ERROR_MESSAGES.valueObjects.userPassword.maxError);
        expect(() => new UserPassword("a".repeat(5))).toThrowError(ERROR_MESSAGES.valueObjects.userPassword.minError);
        expect(() => new UserPassword("a".repeat(32))).not.toThrowError();
        expect(() => new UserPassword("a".repeat(6))).not.toThrowError();
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const userPassword = new UserPassword("TestPassword");
        expect(userPassword.value).toBe("TestPassword");
    })

    it('equalsメソッドが同じ値のUserPasswordに対してtrueを返すこと', () => {
        const userPassword1 = new UserPassword("TestPassword");
        const userPassword2 = new UserPassword("TestPassword");
        expect(userPassword1.equals(userPassword2)).toBe(true);
    })
})