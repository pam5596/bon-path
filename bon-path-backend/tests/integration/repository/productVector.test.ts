import { describe, expect, it } from "vitest";
import { withTestTruncate } from "./_withTestTruncate";
import { PrismaClient, PrismaVectorClient } from "@client";
import { Id, ProductName, ProductPrice, CategoryName, StoreName } from "@models/valueObject";
import { CategoryEntity, ProductEntity, StoreEntity } from "@models/entity";
import { CategoryRepository, ProductRepository, ProductVectorRepository, StoreRepository } from "@repository";
import { OpenAIEmbeddings } from "@langchain/openai";

describe('ProductRepositoryの結合テスト', async () => {
    const prisma = new PrismaClient();
    const model = new OpenAIEmbeddings({
        modelName: 'text-embedding-3-small',
        apiKey: process.env.OPEN_AI_API_KEY,
    });
    const client = new PrismaVectorClient(model, prisma);

    withTestTruncate(prisma, ['Product', 'Store', 'Category', 'ProductVector'])

    const repository = new ProductVectorRepository(client);
    const product_repository = new ProductRepository(prisma);
    const store_repository = new StoreRepository(prisma);
    const category_repository = new CategoryRepository(prisma);

    const foreignDataInserts = async () => {
        const store_entity = await store_repository.insert(new StoreEntity({name: new StoreName('ボンパス店')}))
        const category_entity = await category_repository.insert(new CategoryEntity({name: new CategoryName('食品')}))
        const product_entities = await product_repository.insertMany(
            [
                'あまおう',
                'とちおとめ',
                '紅ほっぺ',
                'さがほのか',
                'もういっこ',
                'おいしい牛乳',
                '低脂肪乳',
                'チップスター',
                'プリングス',
            ].map((productName) => new ProductEntity({ 
                storeId: new Id(1),
                categoryId: new Id(1),
                name: new ProductName(productName),
                price: new ProductPrice(200)
            }))
        )

        return {store_entity, category_entity, product_entities}
    }

    it('insertManyメソッドが複数の商品情報を追加できること', async () => {
        const { product_entities } = await foreignDataInserts()

        await repository.insertMany(product_entities);

        const find_results = await prisma.productVector.findMany()
        console.log(find_results)
        expect(find_results.length).toBe(9)
    });
    
    it('insertManyメソッドが存在しない外部キーの商品を含む場合、エラーになること', async () => {    
        const entities = Array(3).fill(new ProductEntity({ 
            id: new Id(999),
            name: new ProductName('存在しない商品'),
            price: new ProductPrice(200),
            storeId: new Id(999),
            categoryId: new Id(999)
        }))
        await expect(repository.insertMany(entities)).rejects.toThrowError();
    });

    it('searchByNameが指定した名前に類似する商品情報を返す', async () => {
        const { product_entities } = await foreignDataInserts()
        await repository.insertMany(product_entities);

        const results = await repository.searchProductIdByName(new ProductName('牛乳'));
        console.log(results);
        expect(results.length).toBeGreaterThan(0);
    })
})