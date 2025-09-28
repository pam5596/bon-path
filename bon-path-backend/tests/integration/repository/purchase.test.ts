import { describe, expect, it } from "vitest";
import { withTestTruncate } from "./_withTestTruncate";
import { PrismaClient } from "@client";
import {
    Id, 
    ReceiptIsChecked, ReceiptLatitude, ReceiptLongitude, 
    UserEmail, UserHashPassword, UserName, 
    StoreName, 
    ProductName, ProductPrice,
    CategoryName,
    PurchaseQuantity, PurchasePrice,
} from "@models/valueObject";
import { ReceiptEntity, UserEntity, ProductEntity, StoreEntity, CategoryEntity, PurchaseEntity } from "@models/entity";
import { ReceiptRepository, UserRepository, ProductRepository, StoreRepository, PurchaseRepository, CategoryRepository } from "@repository";

describe('PurchaseRepositoryの結合テスト', () => {
    const client = new PrismaClient()
    withTestTruncate(client, ['Receipt', 'User', 'Store', 'Product'])

    const primitives = {
        quantity: 3,
        price: 500
    }

    const valueObjects = {
        quantity: new PurchaseQuantity(primitives.quantity),
        price: new PurchasePrice(primitives.price)
    }

    const repository = new PurchaseRepository(client);
    const user_repository = new UserRepository(client);
    const receipt_repository = new ReceiptRepository(client);
    const store_repository = new StoreRepository(client);
    const product_repository = new ProductRepository(client);
    const category_repository = new CategoryRepository(client);

    const foreignDataInserts = async () => {
        const user_entity = await user_repository.insert(new UserEntity({
            name: new UserName('ボンパス太郎'),
            password: new UserHashPassword('$argon2id$v=19$m=65536,t=3,p=4$FZej+Jwsm6aZfX9+Wf3p6A$7y0SxIB7U4HQfMF5g53s6XHLr6vErvP5PrdP8R+L0rc'),
            email: new UserEmail('bonpath@example.com')
        }));
        const receipt_entity = await receipt_repository.insert(new ReceiptEntity({
            userId: user_entity.id!,
            isChecked: new ReceiptIsChecked(false),
            latitude: new ReceiptLatitude(45.0000),
            longitude: new ReceiptLongitude(45.0000)
        }));
        const store_entity = await store_repository.insert(new StoreEntity({
            name: new StoreName('ボンパス店')
        }));
        const category_entity = await category_repository.insert(new CategoryEntity({
            name: new CategoryName('食品')
        }));
        const product_entities = await product_repository.insertMany([
            new ProductEntity({
                name: new ProductName('バナナ'),
                price: new ProductPrice(200),
                categoryId: category_entity.id!,
                storeId: store_entity.id!
            })
        ]);

        return {
            user_entity,
            receipt_entity,
            store_entity,
            product_entity: product_entities[0]
        }
    }

    it('insertManyメソッドが複数の購入履歴を追加できること', async () => {
        const {
            user_entity, 
            receipt_entity, 
            store_entity, 
            product_entity
        } = await foreignDataInserts();

        const entities = Array(3).fill(
            new PurchaseEntity({
                ...valueObjects,
                userId: user_entity.id!,
                receiptId: receipt_entity.id!,
                storeId: store_entity.id!,
                productId: product_entity.id!
            })
        );
        const result = await repository.insertMany(entities);

        expect(result.length).toBe(3)

        const count = await client.purchase.count();
        expect(count).toBe(3)
    });

    it('insertManyメソッドが存在しない外部キーの購入履歴を追加できないこと', async () => {        
        const entities = Array(3).fill(
            new PurchaseEntity({
                ...valueObjects,
                userId: new Id(999),
                receiptId: new Id(999),
                storeId: new Id(999),
                productId: new Id(999)
            })
        );
        await expect(repository.insertMany(entities)).rejects.toThrowError();
    });

    it('selectByIdが指定したIDの購入履歴を返す', async () => {
        const {
            user_entity, 
            receipt_entity, 
            store_entity, 
            product_entity
        } = await foreignDataInserts();

        const entities = Array(3).fill(
            new PurchaseEntity({
                ...valueObjects,
                userId: user_entity.id!,
                receiptId: receipt_entity.id!,
                storeId: store_entity.id!,
                productId: product_entity.id!
            })
        );
        const insert_results = await repository.insertMany(entities);

        const selectable_result = await repository.selectById(insert_results[0].id!)

        expect(selectable_result).toEqual(insert_results[0])
        expect(selectable_result?.id?.value).toBe(insert_results[0].id?.value)

        const null_result = await repository.selectById(new Id(999));
        expect(null_result).toEqual(null)
    });

    it('selectByUserIdが指定したユーザーIDの購入履歴を返す', async () => {
        const {
            user_entity, 
            receipt_entity, 
            store_entity, 
            product_entity
        } = await foreignDataInserts();

        const entities = Array(3).fill(
            new PurchaseEntity({
                ...valueObjects,
                userId: user_entity.id!,
                receiptId: receipt_entity.id!,
                storeId: store_entity.id!,
                productId: product_entity.id!
            })
        );
        await repository.insertMany(entities);

        const select_results = await repository.selectByUserId(user_entity.id!)
        
        expect(select_results.length).toBe(3)
        expect(select_results[0].userId).toEqual(user_entity.id)

        const null_result = await repository.selectByUserId(new Id(999));
        expect(null_result).toEqual([])
    });

    it('selectByReceiptIdが指定したレシートIDの購入履歴を返す', async () => {
        const {
            user_entity, 
            receipt_entity, 
            store_entity, 
            product_entity
        } = await foreignDataInserts();

        const entities = Array(3).fill(
            new PurchaseEntity({
                ...valueObjects,
                userId: user_entity.id!,
                receiptId: receipt_entity.id!,
                storeId: store_entity.id!,
                productId: product_entity.id!
            })
        );
        await repository.insertMany(entities);

        const select_results = await repository.selectByReceiptId(receipt_entity.id!)
        
        expect(select_results.length).toBe(3)
        expect(select_results[0].receiptId).toEqual(receipt_entity.id)

        const null_result = await repository.selectByReceiptId(new Id(999));
        expect(null_result).toEqual([])
    });

    it('deleteByIdが購入履歴を削除すること', async () => {
        const {
            user_entity, 
            receipt_entity, 
            store_entity, 
            product_entity
        } = await foreignDataInserts();

        const entities = Array(3).fill(
            new PurchaseEntity({
                ...valueObjects,
                userId: user_entity.id!,
                receiptId: receipt_entity.id!,
                storeId: store_entity.id!,
                productId: product_entity.id!
            })
        );
        const insert_results = await repository.insertMany(entities);

        const defore_count = await client.purchase.count()
        expect(defore_count).toBe(3)

        await repository.deleteById(insert_results[0].id!);

        const after_count = await client.purchase.count()
        expect(after_count).toBe(2)

        const selected_result = await repository.selectById(insert_results[0].id!)
        expect(selected_result).toBe(null)
    });
})