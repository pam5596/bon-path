import { describe, expect, it } from "vitest";
import { withTestTruncate } from "./_withTestTruncate";
import { PrismaClient } from "@prismaGeneratedClient";
import { CreatedAt, Id, ProductImage, ProductName, ProductPrice, CategoryName, StoreName } from "@models/valueObject";
import { CategoryEntity, ProductEntity, StoreEntity } from "@models/entity";
import { CategoryRepository, ProductRepository, StoreRepository } from "@repository";

describe('ProductRepositoryの結合テスト', async () => {
    const client = new PrismaClient()
    withTestTruncate(client, ['Product', 'Store', 'Category'])

    const primitives = {
        name: "ボンパス牛乳",
        image: "https://vitest.dev/image",
        price: 200
    }

    const valueObjects = {
        name: new ProductName(primitives.name),
        image: new ProductImage(primitives.image),
        price: new ProductPrice(primitives.price)
    }

    const repository = new ProductRepository(client);
    const store_repository = new StoreRepository(client);
    const category_repository = new CategoryRepository(client);

    const foreignDataInserts = async () => {
        const store_entity = await store_repository.insert(new StoreEntity({name: new StoreName('ボンパス店')}))
        const category_entity = await category_repository.insert(new CategoryEntity({name: new CategoryName('バナナ')}))

        return [store_entity, category_entity]
    }
    
    it('insertManyメソッドが複数の商品情報を追加できること', async () => {
        const [store_entity, category_entity] = await foreignDataInserts()
    
        const entities = Array(3).fill(new ProductEntity({ 
            ...valueObjects,
            storeId: store_entity.id!,
            categoryId: category_entity.id!
        }))
        await repository.insertMany(entities);

        const count = await client.product.count()
        expect(count).toBe(3)
    });

    it('insertManyメソッドが存在しない外部キーの店舗やカテゴリーを含む場合、エラーになること', async () => {    
        const entities = Array(3).fill(new ProductEntity({ 
            ...valueObjects,
            storeId: new Id(999),
            categoryId: new Id(999)
        }))
        await expect(repository.insertMany(entities)).rejects.toThrowError();
    });

    it('selectByIdが指定したIDの商品情報を返す', async () => {
        const [store_entity, category_entity] = await foreignDataInserts()
        const entities = Array(3).fill(new ProductEntity({ 
            ...valueObjects,
            storeId: store_entity.id!,
            categoryId: category_entity.id!
        }))
        const insert_results = await repository.insertMany(entities);
        
        const selectable_result = await repository.selectById(insert_results[0].id!)
        
        expect(selectable_result).toEqual(insert_results[0])
        expect(selectable_result?.id?.value).toBe(insert_results[0].id?.value)

        const null_result = await repository.selectById(new Id(999));
        expect(null_result).toEqual(null)
    });

    it('selectByStoreIdが指定した店舗IDの商品情報を返す', async () => {
        const [store_entity, category_entity] = await foreignDataInserts()
        const entities = Array(3).fill(new ProductEntity({ 
            ...valueObjects,
            storeId: store_entity.id!,
            categoryId: category_entity.id!
        }))
        const insert_results = await repository.insertMany(entities);
        
        const selectable_result = await repository.selectByStoreId(store_entity.id!)
        
        expect(selectable_result.length).toBe(3)
        expect(selectable_result).toEqual(insert_results)

        const null_result = await repository.selectByStoreId(new Id(999));
        expect(null_result).toEqual([])
    });

    it('selectByCategoryIdが指定したカテゴリーIDの商品情報を返す', async () => {
        const [store_entity, category_entity] = await foreignDataInserts()
        const entities = Array(3).fill(new ProductEntity({ 
            ...valueObjects,
            storeId: store_entity.id!,
            categoryId: category_entity.id!
        }))
        const insert_results = await repository.insertMany(entities);
        
        const selectable_result = await repository.selectByCategoryId(store_entity.id!)
        
        expect(selectable_result.length).toBe(3)
        expect(selectable_result).toEqual(insert_results)

        const null_result = await repository.selectByCategoryId(new Id(999));
        expect(null_result).toEqual([])
    });

    it('updateが店舗情報の情報を更新すること', async () => {
        const [store_entity, category_entity] = await foreignDataInserts()
        const entities = Array(3).fill(new ProductEntity({ 
            ...valueObjects,
            storeId: store_entity.id!,
            categoryId: category_entity.id!
        }))
        const insert_results = await repository.insertMany(entities);

        const new_values = {
            name: new ProductName("ボンパスチーズ"),
            image: new ProductImage("https://vitest.dev/image2"),
            price: new ProductPrice(500)
        }
        insert_results[0].newValues = new_values

        await repository.update(insert_results[0]);

        const selected_result = await repository.selectById(insert_results[0].id!)
        expect(selected_result?.getValues.name).toEqual(new_values.name)
        expect(selected_result?.getValues.image).toEqual(new_values.image)
        expect(selected_result?.getValues.price).toEqual(new_values.price)
    })

    it('deleteByIdが店舗情報を削除すること', async () => {
        const [store_entity, category_entity] = await foreignDataInserts()
        const entities = Array(3).fill(new ProductEntity({ 
            ...valueObjects,
            storeId: store_entity.id!,
            categoryId: category_entity.id!
        }))
        const insert_results = await repository.insertMany(entities);

        const defore_count = await client.product.count()
        expect(defore_count).toBe(3)

        await repository.deleteById(insert_results[0].id!);

        const after_count = await client.product.count()
        expect(after_count).toBe(2)

        const selected_result = await repository.selectById(insert_results[0].id!)
        expect(selected_result).toBe(null)
    })
})