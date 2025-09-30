import { Argon2Client } from "@client";
import { UserHashPassword, UserPassword } from "@models/valueObject";
import { argon2id } from "argon2";
import { UserPasswordVerifyService } from "service";
import { describe, expect, it } from "vitest";

describe('UserPasswordVerifyServiceの結合テスト', () => {
    const client = new Argon2Client({ type: argon2id })
    const service = new UserPasswordVerifyService(client)

    it('ユーザーのハッシュ化パスワードが等しいこと', async () => {
        const hashedPassword = new UserHashPassword(
            '$argon2id$v=19$m=65536,t=3,p=4$FPCMWQPuGZ/z2YSqQ0HmTA$7BcNUMrTOCuucK+PNbf9vb6nz6LFAzw2viuTYfQvaUE'
        )
        const rowPassword = new UserPassword(
            'password'
        )
        const response = await service.execute({ hashedPassword, rowPassword})
        expect(response).toBe(true)
    })

    it('ユーザーのハッシュ化パスワードが等しくないこと', async () => {
        const hashedPassword = new UserHashPassword(
            '$argon2id$v=19$m=65536,t=3,p=4$FPCMWQPuGZ/z2YSqQ0HmTA$7BcNUMrTOCuucK+PNbf9vb6nz6LFAzw2viuTYfQvaUE'
        )
        const rowPassword = new UserPassword(
            'incorrectPassword'
        )
        const response = await service.execute({ hashedPassword, rowPassword})
        expect(response).toBe(false)
    })
})