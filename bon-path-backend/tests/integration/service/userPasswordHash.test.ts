import { Argon2Client } from "@client";
import { UserPassword } from "@models/valueObject";
import { argon2id } from "argon2";
import { UserPasswordHashService } from "@service";
import { describe, expect, it } from "vitest";

describe('UserPasswordHashServiceの結合テスト', () => {
    const client = new Argon2Client({ type: argon2id })
    const service = new UserPasswordHashService(client)

    it('ユーザーのパスワードをハッシュ化できること', async () => {
        const password = new UserPassword('password');
        const response = await service.execute(password)

        console.log(response)

        expect(response.value.length).toBe(97)
    })
})