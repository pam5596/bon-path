import { describe, expect, it } from "vitest";
import { Argon2Client } from "@client";
import { argon2id } from "argon2";
import { UserHashPassword } from "@models/valueObject";

describe('Argon2Clientの結合テスト', () => {
    const client = new Argon2Client({
        type: argon2id
    });

    it('hashメソッドがパスワードをハッシュ化できること', async () => {
        const response = await client.hash('password');
        
        expect(() => new UserHashPassword(response)).not.toThrowError()
    })

    it('verifyがハッシュ前と後を照合できること', async () => {
        const hash_response = await client.hash('password');
        const true_response = await client.verify(hash_response, 'password')
        const false_response = await client.verify(hash_response, 'other_password')

        expect(true_response).toBe(true)
        expect(false_response).toBe(false)
    })
})