import { describe, expect, it } from "vitest";
import { UserHashPassword } from "@valueObject";

describe("UserHashPassword VOのテスト", () => {
    const value = "$argon2id$v=19$m=65536,t=3,p=4$FZej+Jwsm6aZfX9+Wf3p6A$7y0SxIB7U4HQfMF5g53s6XHLr6vErvP5PrdP8R+L0rc"

    it('argon2形式が正であること', () => {
        expect(() => new UserHashPassword(value)).not.toThrowError();
    })

    it('非argon2形式が不正であること', () => {
        expect(() => new UserHashPassword("iaerngaiuroanfr")).toThrowError();
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const userHashPassword = new UserHashPassword(value);
        expect(userHashPassword.value).toBe(value);
    })

    it('equalsメソッドが同じ値のUserHashPasswordに対してtrueを返すこと', () => {
        const userHashPassword1 = new UserHashPassword(value);
        const userHashPassword2 = new UserHashPassword(value);
        expect(userHashPassword1.equals(userHashPassword2)).toBe(true);
    })
})