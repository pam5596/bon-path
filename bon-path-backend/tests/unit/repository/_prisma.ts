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
        createManyAndReturn: vi.fn(),
        findUnique: vi.fn()
    },
    product: {
        createManyAndReturn: vi.fn(),
        findUnique: vi.fn(),
        findMany: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    },
    receipt: {
        create: vi.fn(),
        findUnique: vi.fn(),
        findMany: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    },
    receiptImage: {
        createManyAndReturn: vi.fn(),
        findMany: vi.fn(),
        delete: vi.fn(),
    },
    purchase: {
        createManyAndReturn: vi.fn(),
        findUnique: vi.fn(),
        findMany: vi.fn(),
        delete: vi.fn(),
    }
};