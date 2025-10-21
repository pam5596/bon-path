import { describe, expect, it } from "vitest";
import { withTestTruncate } from "./_withTestTruncate";
import { PrismaClient } from "@client";
import { Id, CategoryName } from "@models/valueObject";
import { CategoryEntity} from "@models/entity";
import { CategoryRepository } from "@repository";

describe('CategoryRepositoryの結合テスト', () => {
    const client = new PrismaClient()
    withTestTruncate(client, ['Category'])

    const repository = new CategoryRepository(client)

    it('insertManyメソッドが追加したカテゴリーを返す', async () => {                                        
        const entity = new CategoryEntity({
            name: new CategoryName('食品')
        });
        const result = await repository.insertMany(Array(5).fill(entity));

        expect(result.length).toBe(5)
        expect(result[0].getValues.name).toEqual(new CategoryName('食品'))

        const count = await client.category.count()
        expect(count).toBe(5)
    });

    it('存在しないIDをparentIdとしてもつカテゴリーをinsertできないこと', async () => {                                        
        const parent_entity = new CategoryEntity({
            name: new CategoryName('食品')
        });
        const parent_result = await repository.insertMany([parent_entity]);

        const child_entity = new CategoryEntity({
            name: new CategoryName('バナナ'),
            parentId: parent_result[0].id
        });
        const child_result = await repository.insertMany([child_entity]);

        expect(child_result[0].parentId).toEqual(parent_result[0].id)

        const nonchild_entity = new CategoryEntity({
            name: new CategoryName('バナナ'),
            parentId: new Id(999)
        });
        await expect(repository.insertMany([nonchild_entity])).rejects.toThrowError();
    });

    it('selectByIdが指定したIDのカテゴリーを返す', async () => {
        const entity = new CategoryEntity({
            name: new CategoryName('食品')
        });
        const insert_result = await repository.insertMany([entity]);
        
        const selectable_result = await repository.selectById(insert_result[0].id!)
        
        expect(selectable_result).toEqual(insert_result[0])
        expect(selectable_result?.id?.value).toBe(insert_result[0].id?.value)

        const null_result = await repository.selectById(new Id(999));
        expect(null_result).toEqual(null)
    });

    it('selectByParentIdが指定した親の子カテゴリーを返す', async () => {
        const parent_entity = new CategoryEntity({
            name: new CategoryName('食品')
        });
        const parent_result = await repository.insertMany([parent_entity]);

        const child_entity1 = new CategoryEntity({
            name: new CategoryName('バナナ'),
            parentId: parent_result[0].id
        });
        const child_entity2 = new CategoryEntity({
            name: new CategoryName('リンゴ'),
            parentId: parent_result[0].id
        });
        await repository.insertMany([child_entity1, child_entity2]);

        const select_result = await repository.selectByParentId(parent_result[0].id!)
        
        expect(select_result.length).toBe(2)
    });

    it('deleteByIdがカテゴリーを削除すること', async () => {
        const entity = new CategoryEntity({
            name: new CategoryName('食品')
        });
        const insert_result = await repository.insertMany([entity]);


        const defore_count = await client.category.count()
        expect(defore_count).toBe(1)

        await repository.deleteById(insert_result[0].id!);

        const after_count = await client.category.count()
        expect(after_count).toBe(0)

        const selected_result = await repository.selectById(insert_result[0].id!)
        expect(selected_result).toBe(null)
    })
})