import { describe, expect, it } from "vitest";
import { withTestTransaction } from "./_withTestTransaction";
import { PrismaClient } from "@prismaGeneratedClient";
import { CreatedAt, Id, StoreGoogleMapLink, StoreImage, StoreLatitude, StoreLongitude, StoreName } from "@models/valueObject";
import { StoreEntity } from "@models/entity";
import { StoreRepository } from "@repository";

describe('StoreRepositoryの結合テスト', () => {
    const client = new PrismaClient()
    withTestTransaction(client)

    const primitives = {
        name: 'あいうおえ店',
        image: 'https://vitest.dev/image',
        latitude: 90.0000,
        longitude: 90.0000,
        googleMapLink: 'https://vitest.dev/',
        createdAt: new Date('2025-08-29'),
        id: 1
    }

    const valueObjects = {
        id: new Id(primitives.id),
        createdAt: new CreatedAt(primitives.createdAt),
        name: new StoreName(primitives.name),
        image: new StoreImage(primitives.image),
        latitude: new StoreLatitude(primitives.latitude),
        longitude: new StoreLongitude(primitives.longitude),
        googleMapLink: new StoreGoogleMapLink(primitives.googleMapLink),
    }

    const repository = new StoreRepository(client);

    it('insertメソッドが追加した店舗情報を返す', async () => {                                        
        const { id, createdAt, ...values } = valueObjects;
        const entity = new StoreEntity(values);
        const result = await repository.insert(entity);

        expect(result.getValues).toEqual(values)

        const count = await client.store.count()
        expect(count).toBe(1)
    });

    it('selectAllメソッドが全ての店舗を返す', async () => {
        const { id, createdAt, ...values } = valueObjects;

        const insert_results = []
        for (let i = 1; i <= 10; i++) {
            const entity = new StoreEntity(values);
            const insert_result = await repository.insert(entity)
            insert_results.push(insert_result)
        }
        
        const select_results = await repository.selectAll();
        expect(insert_results.length).toEqual(select_results.length)
    });

    
    it('selectByIdが指定したIDの店舗情報を返す', async () => {
        const { id, createdAt, ...values } = valueObjects;
        const entity = new StoreEntity(values);
        const insert_result = await repository.insert(entity);
        
        const selectable_result = await repository.selectById(insert_result.id!)
        
        expect(selectable_result).toEqual(entity)
        expect(selectable_result?.id?.value).toBe(entity.id?.value)

        const null_result = await repository.selectById(new Id(999));
        expect(null_result).toEqual(null)
    })

    it('updateが店舗情報の情報を更新すること', async () => {
        const { id, createdAt, ...values } = valueObjects;
        const entity = new StoreEntity(values);
        const insert_result = await repository.insert(entity);

        const new_values = {
            name: new StoreName("かきくけこ店"),
            image: new StoreImage("https://vitest.dev/image"),
            latitude: new StoreLatitude(0.0000),
            longitude: new StoreLongitude(0.0000),
            googleMapLink: new StoreGoogleMapLink("https://vitest.dev2/"),
        }
        insert_result.newValues = new_values

        await repository.update(insert_result);

        const selected_result = await repository.selectById(insert_result.id!)
        expect(selected_result?.getValues.name).toEqual(new_values.name)
        expect(selected_result?.getValues.image).toEqual(new_values.image)
        expect(selected_result?.getValues.latitude).toEqual(new_values.latitude)
        expect(selected_result?.getValues.longitude).toEqual(new_values.longitude)
        expect(selected_result?.getValues.googleMapLink).toEqual(new_values.googleMapLink)
    })

    it('deleteByIdが店舗情報を削除すること', async () => {
        const { id, createdAt, ...values } = valueObjects;
        const entity = new StoreEntity(values);
        const insert_result = await repository.insert(entity);

        const defore_count = await client.store.count()
        expect(defore_count).toBe(1)

        await repository.deleteById(insert_result.id!);

        const after_count = await client.store.count()
        expect(after_count).toBe(0)

        const selected_result = await repository.selectById(insert_result.id!)
        expect(selected_result).toBe(null)
    })
})