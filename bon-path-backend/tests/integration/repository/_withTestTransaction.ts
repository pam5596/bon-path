import { beforeEach, afterEach } from "vitest";
import { PrismaClient } from "@client";

export function withTestTransaction(client: PrismaClient) {
    beforeEach(
        async () => {
            await client.$executeRaw`BEGIN`;
        }
    );

    afterEach(
        async () => {
            await client.$executeRaw`ROLLBACK`;
        }
    )
}