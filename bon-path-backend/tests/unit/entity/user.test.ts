import { describe, expect, test } from "vitest";
import { UserEntity } from "@models/entity";
import { CreatedAt, Id, UserEmail, UserHashId, UserHashPassword, UserName, UserPassword } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe('UserEntityのテスト', () => {
    const testPrimitives = {
        id: 1,
        hashedId: "cjr4j6g6g0000qzrmn0g1v6xv",
        name: "testuser",
        email: "test@example.com",
        password: "$argon2id$v=19$m=65536,t=3,p=4$FZej+Jwsm6aZfX9+Wf3p6A$7y0SxIB7U4HQfMF5g53s6XHLr6vErvP5PrdP8R+L0rc",
        createdAt: new Date('2025-08-29')
    }

    const testValueObjects = {
        id: new Id(testPrimitives.id),
        hashedId: new UserHashId(testPrimitives.hashedId),
        name: new UserName(testPrimitives.name),
        email: new UserEmail(testPrimitives.email),
        password: new UserHashPassword(testPrimitives.password),
        createdAt: new CreatedAt(testPrimitives.createdAt)
    }

    test('DB挿入前のオブジェクトをインスタンス化できること', () => {
        const { id, hashedId, createdAt, ...values } = testValueObjects;
        expect(() => new UserEntity(values)).not.toThrowError()
    })

    test('DB挿入後のオブジェクトをインスタンス化できること', () => {
        expect(() => new UserEntity(testValueObjects)).not.toThrowError()
    })

    test('fromPrimitivesが生のオブジェクトをインスタンス化できること', () => {
        expect(UserEntity.fromPrimitives(testPrimitives)).toEqual(new UserEntity(testValueObjects))
    })

    test('各ゲッターメソッドが正しく値を返すこと', () => {
        expect(new UserEntity(testValueObjects).id).toEqual(testValueObjects.id)

        const { id: voId, createdAt: voCreatedAt, ...voValues } = testValueObjects;
        expect(new UserEntity(testValueObjects).getValues).toEqual(voValues)

        expect(new UserEntity(testValueObjects).hashedId).toEqual(testValueObjects.hashedId)

        const { id: prId, createdAt: prCreatedAt, ...prValues } = testPrimitives;
        expect(new UserEntity(testValueObjects).toPrimitives).toEqual(prValues)
    })

    test('idセッターが正しく機能すること', () => {
        const { id, createdAt, ...values } = testValueObjects;
        const entity = new UserEntity(values)
        entity.newId = new Id(2)
        expect(entity.id).toEqual(new Id(2));

        expect(() => entity.newId = new Id(3)).toThrowError(ERROR_MESSAGES.entity._abstruct.newIdError.detail)
    })

    test('hashedIdセッターが正しく機能すること', () => {
        const { id, createdAt, hashedId, ...values } = testValueObjects;
        const entity = new UserEntity(values)
        entity.newHashedId = new UserHashId("cjr4j6g6g0000qzrmn0g1vya")
        expect(entity.hashedId).toEqual(new UserHashId("cjr4j6g6g0000qzrmn0g1vya"));

        expect(() => entity.newHashedId = new UserHashId("cjr4j6g6g0000qzrmn0g1111")).toThrowError(ERROR_MESSAGES.entity.user.newHashIdError.detail)
    })

    test('valuesセッターが正しく機能すること', () => {
        const entity = new UserEntity(testValueObjects)
        const new_values = {
            name: new UserName("testuser2"),
            email: new UserEmail("test2@example.com"),
            password: new UserHashPassword("$argon2id$v=19$m=65536,t=3,p=4$FZej+Jwsm6aZfX9+Wf3p6A$7y0SxIB7U4HQfMF5g53s6XHLr6vErvP5PrdP8R+L0rl"),
        }

        entity.newValues = new_values
        expect(entity.getValues.name).toEqual(new_values.name);
        expect(entity.getValues.email).toEqual(new_values.email);
        expect(entity.getValues.password).toEqual(new_values.password);
    })

    test('equalsメソッドが正しく機能すること', () => {
        const entity = new UserEntity(testValueObjects)
        const same_entity = new UserEntity(testValueObjects)

        const { id, ...values } = testValueObjects;
        const different_entity = new UserEntity({ id: new Id(3), ...values})

        expect(entity.equals(same_entity)).toBe(true)
        expect(entity.equals(different_entity)).toBe(false)
    })
})