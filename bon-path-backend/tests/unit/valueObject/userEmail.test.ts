import { describe, expect, it } from "vitest";
import { UserEmail } from "@valueObject";

describe("useEmail VOのテスト", () => {
    it('空文字が不正であること', () => {
        expect(() => new UserEmail("")).toThrowError();
    })

    it('非メールアドレス形式の文字が不正であること', () => {
        expect(() => new UserEmail("user-email")).toThrowError();
    })

    it('メールアドレス形式の文字が正であること', () => {
        expect(() => new UserEmail("user@example.com")).not.toThrowError();
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const userEmail = new UserEmail("user@example.com");
        expect(userEmail.value).toBe("user@example.com");
    })

    it('equalsメソッドが同じ値のUserEmailに対してtrueを返すこと', () => {
        const userEmail1 = new UserEmail("user@example.com");
        const userEmail2 = new UserEmail("user@example.com");
        expect(userEmail1.equals(userEmail2)).toBe(true);
    })

})