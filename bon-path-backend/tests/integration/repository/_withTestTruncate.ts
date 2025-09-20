import { beforeEach } from "vitest";
import { PrismaClient } from "@prismaGeneratedClient";

export function withTestTruncate(client: PrismaClient, tables: string[]) {
    beforeEach(
        async () => {
            await client.$executeRawUnsafe(`
                TRUNCATE TABLE
                    ${tables.map((t) => `"${t}"`).join(',')}
                RESTART IDENTITY CASCADE
            `)
        }
    );
}