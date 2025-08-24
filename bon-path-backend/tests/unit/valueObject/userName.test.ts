import { describe, expect, it } from "vitest";
import { UserName } from "@valueObject";

describe("userName VOのテスト", () => {
    it('空文字が不正であること', () => {
        expect(() => new UserName("")).toThrowError();
    })

    it('1文字以上30文字以下であること', () => {
        expect(() => new UserName("a".repeat(31))).toThrowError();
        expect(() => new UserName("a".repeat(30))).not.toThrowError();
        expect(() => new UserName("a".repeat(1))).not.toThrowError();
    })

    it('空白文字が不正であること', () => {
        expect(() => new UserName("   ")).toThrowError();
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