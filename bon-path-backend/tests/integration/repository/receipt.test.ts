import { describe, expect, it } from "vitest";
import { withTestTransaction } from "./_withTestTransaction";
import { PrismaClient } from "@client";
import { Id, ReceiptIsChecked, ReceiptLatitude, ReceiptLongitude, UserEmail, UserHashPassword, UserName } from "@models/valueObject";
import { ReceiptEntity, UserEntity } from "@models/entity";
import { ReceiptRepository, UserRepository } from "@repository";

describe('ReceiptRepositoryの結合テスト', () => {
    const client = new PrismaClient()
    withTestTransaction(client)

    const primitives = {
        isChecked: false,
        latitude: 45.0000,
        longitude: 45.0000
    }

    const valueObjects = {
        isChecked: new ReceiptIsChecked(primitives.isChecked),
        latitude: new ReceiptLatitude(primitives.latitude),
        longitude: new ReceiptLongitude(primitives.longitude)
    }

    const repository = new ReceiptRepository(client);
    const user_repository = new UserRepository(client);

    const foreignDataInserts = async () => {
        return await user_repository.insert(
            new UserEntity({
                name: new UserName('ボンパス太郎'),
                password: new UserHashPassword('$argon2id$v=19$m=65536,t=3,p=4$FZej+Jwsm6aZfX9+Wf3p6A$7y0SxIB7U4HQfMF5g53s6XHLr6vErvP5PrdP8R+L0rc'),
                email: new UserEmail('bonpath@example.com')
            })
        )
    }

    it('insertメソッドがレシート情報を追加できること', async () => {
        const user_entity = await foreignDataInserts()
        const entity = new ReceiptEntity({
            ...valueObjects,
            userId: user_entity.id!
        })
        const result = await repository.insert(entity);

        expect(result.getValues).toEqual({
            ...valueObjects,
            userId: user_entity.id
        })

        const count = await client.receipt.count()
        expect(count).toBe(1)
    });


    it('insertメソッドが存在しないユーザーのレシートを追加できないこと', async () => {        
        const entity = new ReceiptEntity({
            ...valueObjects,
            userId: new Id(999)
        })
        await expect(repository.insert(entity)).rejects.toThrowError();
    });

    it('selectByIdが指定したIDのレシート情報を返す', async () => {
        const user_entity = await foreignDataInserts()
        const entity = new ReceiptEntity({
            ...valueObjects,
            userId: user_entity.id!
        })
        const insert_result = await repository.insert(entity);

        const selectable_result = await repository.selectById(insert_result.id!)

        expect(selectable_result).toEqual(insert_result)
        expect(selectable_result?.id?.value).toBe(insert_result.id?.value)

        const null_result = await repository.selectById(new Id(999));
        expect(null_result).toEqual(null)
    });

    it('selectByUserIdが指定したユーザーIDのレシート情報を返す', async () => {
        const user_entity = await foreignDataInserts()
        const entity = new ReceiptEntity({
            ...valueObjects,
            userId: user_entity.id!
        })
        await repository.insert(entity);
        
        const select_results = await repository.selectByUserId(user_entity.id!)
        
        expect(select_results.length).toBe(1)
        expect(select_results[0].userId).toEqual(user_entity.id)

        const null_result = await repository.selectByUserId(new Id(999));
        expect(null_result).toEqual([])
    });

    it('updateがレシートの情報を更新すること', async () => {
        const user_entity = await foreignDataInserts()
        const entity = new ReceiptEntity({
            ...valueObjects,
            userId: user_entity.id!
        })
        const insert_result = await repository.insert(entity);

        insert_result.toggleIsChecked()

        await repository.update(insert_result);

        const selected_result = await repository.selectById(insert_result.id!)
        expect(selected_result?.getValues.isChecked.value).toEqual(true)
    })

    it('deleteByIdがレシートを削除すること', async () => {
        const user_entity = await foreignDataInserts()
        const entity = new ReceiptEntity({
            ...valueObjects,
            userId: user_entity.id!
        })
        const insert_result = await repository.insert(entity);

        const defore_count = await client.receipt.count()
        expect(defore_count).toBe(1)

        await repository.deleteById(insert_result.id!);

        const after_count = await client.receipt.count()
        expect(after_count).toBe(0)

        const selected_result = await repository.selectById(insert_result.id!)
        expect(selected_result).toBe(null)
    })

})