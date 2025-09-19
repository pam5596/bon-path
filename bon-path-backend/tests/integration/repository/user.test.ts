import { describe, expect, it } from "vitest";
import { withTestTransaction } from "./_withTestTransaction";
import { PrismaClient } from "@prismaGeneratedClient";
import { CreatedAt, Id, UserEmail, UserHashId, UserHashPassword, UserName } from "@models/valueObject";
import { UserEntity } from "@models/entity";
import { UserRepository } from "@repository";

describe('UserRepositoryの結合テスト', () => {
    const client = new PrismaClient()
    withTestTransaction(client)

    const primitives = {
        hashedId: "cjr4j6g6g0000qzrmn0g1v6xv",
        name: "testuser",
        email: "test@example.com",
        password: "$argon2id$v=19$m=65536,t=3,p=4$FZej+Jwsm6aZfX9+Wf3p6A$7y0SxIB7U4HQfMF5g53s6XHLr6vErvP5PrdP8R+L0rc",
        createdAt: new Date('2025-08-29'),
        id: 1
    }

    const valueObjects = {
        id: new Id(primitives.id),
        createdAt: new CreatedAt(primitives.createdAt),
        hashedId: new UserHashId(primitives.hashedId),
        name: new UserName(primitives.name),
        email: new UserEmail(primitives.email),
        password: new UserHashPassword(primitives.password),
    }

    const repository = new UserRepository(client);

    it('insertメソッドが追加したユーザーを返す', async () => {                                        
        const { id, createdAt, hashedId, ...values } = valueObjects;
        const entity = new UserEntity(values);
        const result = await repository.insert(entity);

        const { hashedId: getHashId, ...getValues } = result.getValues;
        expect(getValues).toEqual(values)

        const count = await client.user.count()
        expect(count).toBe(1)
    });

    it('同じemailのユーザーをinsertできないこと', async () => {
        const { id, createdAt, hashedId, ...values } = valueObjects;
        const entity = new UserEntity(values);
        const result = await repository.insert(entity);

        await expect(repository.insert(result)).rejects.toThrowError()
    })


    it('selectByIdが指定したIDのユーザーを返す', async () => {
        const { id, createdAt, hashedId, ...values } = valueObjects;
        const entity = new UserEntity(values);
        const insert_result = await repository.insert(entity);
        
        const selectable_result = await repository.selectById(insert_result.id!)
        
        expect(selectable_result).toEqual(entity)
        expect(selectable_result?.id?.value).toBe(entity.id?.value)

        const null_result = await repository.selectById(new Id(999));
        expect(null_result).toEqual(null)
    })

    it('updateがユーザーの情報を更新すること', async () => {
        const { id, createdAt, hashedId, ...values } = valueObjects;
        const entity = new UserEntity(values);
        const insert_result = await repository.insert(entity);

        const new_values = {
            name: new UserName("updateusername"),
            email: new UserEmail("update@example.com")
        }
        insert_result.newValues = new_values

        await repository.update(insert_result);

        const selected_result = await repository.selectById(insert_result.id!)
        expect(selected_result?.getValues.name).toEqual(new_values.name)
        expect(selected_result?.getValues.email).toEqual(new_values.email)
    })

    it('deleteがユーザーを削除すること', async () => {
        const { id, createdAt, hashedId, ...values } = valueObjects;
        const entity = new UserEntity(values);
        const insert_result = await repository.insert(entity);

        const defore_count = await client.user.count()
        expect(defore_count).toBe(1)

        await repository.deleteById(insert_result.id!);

        const after_count = await client.user.count()
        expect(after_count).toBe(0)

        const selected_result = await repository.selectById(insert_result.id!)
        expect(selected_result).toBe(null)
    })
})