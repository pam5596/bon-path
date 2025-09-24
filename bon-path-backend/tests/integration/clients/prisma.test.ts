import { describe, expect, it } from "vitest";
import { PrismaClient } from "@client";

describe('PrismaClientの結合テスト', () => {
    const client = new PrismaClient();

    it('データベースに接続できること', async () => {
        expect(async () => await client.$connect()).not.toThrowError();
    })

    it('データベースから切断できること', async () => {
        expect(async () => await client.$disconnect()).not.toThrowError();
    })
})