import { describe, expect, it } from "vitest";
import { withTestTransaction } from "./_withTestTransaction";
import { PrismaClient } from "@prismaGeneratedClient";
import { Id, CategoryName } from "@models/valueObject";
import { CategoryEntity} from "@models/entity";
import { CategoryRepository } from "@repository";

describe('CategoryRepositoryの結合テスト', () => {
    const client = new PrismaClient()
    withTestTransaction(client)

    const repository = new CategoryRepository(client)

    it('insertメソッドが追加したカテゴリーを返す', async () => {                                        
        const entity = new CategoryEntity({
            name: new CategoryName('食品')
        });
        const result = await repository.insert(entity);

        expect(result.getValues.name).toEqual(new CategoryName('食品'))

        const count = await client.category.count()
        expect(count).toBe(1)
    });

    it('存在しないIDをparentIdとしてもつカテゴリーをinsertできないこと', async () => {                                        
        const parent_entity = new CategoryEntity({
            name: new CategoryName('食品')
        });
        const parent_result = await repository.insert(parent_entity);

        const child_entity = new CategoryEntity({
            name: new CategoryName('バナナ'),
            parentId: parent_result.id
        });
        const child_result = await repository.insert(child_entity);

        expect(child_result.parentId).toEqual(parent_result.id)

        const nonchild_entity = new CategoryEntity({
            name: new CategoryName('バナナ'),
            parentId: new Id(999)
        });
        await expect(repository.insert(nonchild_entity)).rejects.toThrowError();
    });

    it('selectByIdが指定したIDのカテゴリーを返す', async () => {
        const entity = new CategoryEntity({
            name: new CategoryName('食品')
        });
        const insert_result = await repository.insert(entity);
        
        const selectable_result = await repository.selectById(insert_result.id!)
        
        expect(selectable_result).toEqual(entity)
        expect(selectable_result?.id?.value).toBe(entity.id?.value)

        const null_result = await repository.selectById(new Id(999));
        expect(null_result).toEqual(null)
    });

    it('selectByParentIdが指定した親の子カテゴリーを返す', async () => {
        const parent_entity = new CategoryEntity({
            name: new CategoryName('食品')
        });
        const parent_result = await repository.insert(parent_entity);

        const child_entity1 = new CategoryEntity({
            name: new CategoryName('バナナ'),
            parentId: parent_result.id
        });
        const child_entity2 = new CategoryEntity({
            name: new CategoryName('リンゴ'),
            parentId: parent_result.id
        });
        await repository.insert(child_entity1);
        await repository.insert(child_entity2);

        const select_result = await repository.selectByParentId(parent_entity.id!)
        
        expect(select_result).toEqual([child_entity1, child_entity2])
    });

    it('deleteByIdがカテゴリーを削除すること', async () => {
        const entity = new CategoryEntity({
            name: new CategoryName('食品')
        });
        const insert_result = await repository.insert(entity);


        const defore_count = await client.category.count()
        expect(defore_count).toBe(1)

        await repository.deleteById(insert_result.id!);

        const after_count = await client.category.count()
        expect(after_count).toBe(0)

        const selected_result = await repository.selectById(insert_result.id!)
        expect(selected_result).toBe(null)
    })
})