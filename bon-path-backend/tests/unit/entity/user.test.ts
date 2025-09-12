import { describe, expect, test } from "vitest";
import { UserEntity } from "@models/entity";
import { CreatedAt, Id, UserEmail, UserHashId, UserHashPassword, UserName, UserPassword } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe('UserEntityのテスト', () => {
    const id = new Id(1)
    const hashedId = new UserHashId("cjr4j6g6g0000qzrmn0g1v6xv")
    const correct_values = {
        name: new UserName("testuser"),
        email: new UserEmail("test@example.com"),
        password: new UserHashPassword("$argon2id$v=19$m=65536,t=3,p=4$FZej+Jwsm6aZfX9+Wf3p6A$7y0SxIB7U4HQfMF5g53s6XHLr6vErvP5PrdP8R+L0rc"),
        createdAt: new CreatedAt(new Date('2025-08-29'))
    }

    test('DB挿入前のオブジェクトをインスタンス化できること', () => {
        expect(() => new UserEntity({
            name: correct_values.name,
            email: correct_values.email,
            password: correct_values.password
        })).not.toThrowError()
    })

    test('DB挿入後のオブジェクトをインスタンス化できること', () => {
        expect(() => new UserEntity(correct_values, id)).not.toThrowError()
    })

    test('各プロパティに対して適切なエラーを返すこと', () => {
        expect(() => new UserEntity({
            ...correct_values,
            hashedId: "間違った値"
        })).toThrow()

        expect(() => new UserEntity({
            ...correct_values,
            name: ""
        })).toThrow()

        expect(() => new UserEntity({
            ...correct_values,
            email: "間違った値"
        })).toThrow()


        expect(() => new UserEntity({
            ...correct_values,
            password: "間違った値"
        })).toThrow()

        expect(() => new UserEntity({
            ...correct_values,
            createdAt: "間違った値"
        })).toThrow()
    })

    test('各ゲッターメソッドが正しく値を返すこと', () => {
        expect(new UserEntity(correct_values, id).id).toEqual(id)

        expect(new UserEntity(correct_values).getValues).toEqual(correct_values)

        expect(new UserEntity(correct_values).hashedId).toEqual(correct_values.hashedId)

        expect(new UserEntity(correct_values).toPrimitives).toEqual(
            Object.fromEntries(
                Object.entries(correct_values).map(([k,v]) => [k, v.value])
            )
        )
    })

    test('idセッターが正しく機能すること', () => {
        const entity = new UserEntity(correct_values)
        entity.newId = new Id(2)
        expect(entity.id).toEqual(new Id(2));

        expect(() => entity.newId = new Id(3)).toThrowError(ERROR_MESSAGES.entity._abstruct.newIdError.detail)
    })

    test('hashedIdセッターが正しく機能すること', () => {
        const entity = new UserEntity(correct_values)
        entity.newHashedId = new UserHashId("cjr4j6g6g0000qzrmn0g1vya")
        expect(entity.hashedId).toEqual(new UserHashId("cjr4j6g6g0000qzrmn0g1vya"));

        expect(() => entity.newHashedId = new UserHashId("cjr4j6g6g0000qzrmn0g1111")).toThrowError(ERROR_MESSAGES.entity.user.newHashIdError.detail)
    })

    test('valuesセッターが正しく機能すること', () => {
        const entity = new UserEntity(correct_values)
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
        const entity = new UserEntity(correct_values)
        const same_entity = new UserEntity(correct_values)
        const different_entity = new UserEntity(correct_values, new Id(2))

        expect(entity.equals(same_entity)).toBe(true)
        expect(entity.equals(different_entity)).toBe(false)
    })
})