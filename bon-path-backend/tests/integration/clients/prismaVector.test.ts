import { describe, expect, it } from "vitest";
import { PrismaVectorClient, PrismaClient } from "@client";
import { OpenAIEmbeddings } from "@langchain/openai";

describe('PrismaVectorClientの結合テスト', () => {
    const prisma = new PrismaClient();
    const model = new OpenAIEmbeddings()

    it('PrismaVectorClientが初期化できること', () => {
        const client = new PrismaVectorClient(model, prisma);
        expect(client).toBeInstanceOf(PrismaVectorClient);
    });

    it('productプロパティがPrismaVectorStoreのインスタンスを返すこと', () => {
        const client = new PrismaVectorClient(model, prisma);
        const productStore = client.product;

        expect(productStore).toBeDefined();
        expect(productStore).toHaveProperty('addModels');
        expect(productStore).toHaveProperty('similaritySearch');
    });

    it('storeプロパティがPrismaVectorStoreのインスタンスを返すこと', () => {
        const client = new PrismaVectorClient(model, prisma);
        const storeStore = client.store;

        expect(storeStore).toBeDefined();
        expect(storeStore).toHaveProperty('addModels');
        expect(storeStore).toHaveProperty('similaritySearch');
    });
})