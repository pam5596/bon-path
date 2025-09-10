import { PrismaClient } from "@prismaGeneratedClient";
import { vi } from "vitest";

export const PrismaMock = {
    user: {
        create: vi.fn(),
        findUnique: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    },
    store: {
        create: vi.fn(),
        findMany: vi.fn(),
        findUnique: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    },
    category: {
        create: vi.fn(),
        findUnique: vi.fn()
    }
};