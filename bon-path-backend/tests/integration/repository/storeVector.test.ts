import { describe, expect, it } from "vitest";
import { withTestTruncate } from "./_withTestTruncate";
import { PrismaClient, PrismaVectorClient } from "@client";
import { Id, StoreGoogleMapLink, StoreImage, StoreLatitude, StoreLongitude, StoreName } from "@models/valueObject";
import { StoreEntity } from "@models/entity";
import { StoreRepository, StoreVectorRepository } from "@repository";
import { OpenAIEmbeddings } from "@langchain/openai";

describe('StoreVectorRepositoryの結合テスト', () => {
    const prisma = new PrismaClient();
    const model = new OpenAIEmbeddings({
        modelName: 'text-embedding-3-small',
        apiKey: process.env.OPEN_AI_API_KEY,
    });
    const client = new PrismaVectorClient(model, prisma);

    withTestTruncate(prisma, ['Store', 'StoreVector'])

    const repository = new StoreVectorRepository(client);
    const store_repository = new StoreRepository(prisma);

    const foreignDataInserts = async () => {
        const store_entities = await Promise.all(
            [
                'ファミリーマート 聖坂店',
                'ローソン 上野店',
                'セブンイレブン 沖縄店',
                'マルナカ 土庄店',
                'イオン 丸亀店',
                'オーケー お台場店',
                'ニトリ 観音寺店',
                'コスモス 服部店',
                'マツモトキヨシ 田町店',
                'ドン・キホーテ 白川店'
            ].map(async (storeName) => 
                await store_repository.insert(
                    new StoreEntity({name: new StoreName(storeName)})
                )
            )
        )
        return store_entities
    }

    it('insertManyメソッドが複数の店舗情報を追加できること', async () => {
        const store_entities = await foreignDataInserts()

        await repository.insertMany(store_entities);

        const find_results = await prisma.storeVector.findMany()
        console.log(find_results)
        expect(find_results.length).toBe(10)
    });

    it('insertManyメソッドが存在しない外部キーの店舗を含む場合、エラーになること', async () => {    
        const entities = Array(3).fill(new StoreEntity({
            name: new StoreName('存在しない店舗'),
            image: undefined,
            latitude: undefined,
            longitude: undefined,
            googleMapLink: undefined,
        }))

        await expect(repository.insertMany(entities)).rejects.toThrowError()
    })

    it('searchStoreIdByNameメソッドが名前で店舗を検索できること', async () => {
        const store_entities = await foreignDataInserts()
        await repository.insertMany(store_entities);

        const results = await repository.searchStoreIdByName(new StoreName('コンビニ'), 5);
        console.log(results);
        expect(results.length).toBe(5)
    })
})