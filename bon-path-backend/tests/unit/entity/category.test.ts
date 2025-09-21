import { describe, expect, test } from "vitest";
import { CategoryEntity } from "@models/entity";
import { Id, CategoryName } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe('CategoryEntityのテスト', () => {
    const testPrimitives = {
        id: 1,
        parentId: 2,
        name: "テストカテゴリー"
    }

    const testValueObjects = {
        id: new Id(testPrimitives.id),
        parentId: new Id(testPrimitives.parentId),
        name: new CategoryName(testPrimitives.name)
    }

    test('DB挿入前のオブジェクトをインスタンス化できること', () => {
        const { id, ...values } = testValueObjects;
        expect(() => new CategoryEntity(values)).not.toThrowError()
    })

    test('DB挿入後のオブジェクトをインスタンス化できること', () => {
        expect(() => new CategoryEntity(testValueObjects)).not.toThrowError()
    })

    test('fromPrimitivesが生のオブジェクトをインスタンス化できること', () => {
        expect(CategoryEntity.fromPrimitives(testPrimitives)).toEqual(new CategoryEntity(testValueObjects))
    })

    test('各ゲッターメソッドが正しく値を返すこと', () => {
        expect(new CategoryEntity(testValueObjects).id).toEqual(testValueObjects.id)

        const { id: voId, ...voValues } = testValueObjects;
        expect(new CategoryEntity(testValueObjects).getValues).toEqual(voValues)

        expect(new CategoryEntity(testValueObjects).parentId).toEqual(testValueObjects.parentId)

        const { id: prId, ...prValues } = testPrimitives;
        expect(new CategoryEntity(testValueObjects).toPrimitives).toEqual(prValues)
    })

    test('idセッターが正しく機能すること', () => {
        const { id, ...values } = testValueObjects;
        const entity = new CategoryEntity(values)
        entity.newId = new Id(2)
        expect(entity.id).toEqual(new Id(2));

        expect(() => entity.newId = new Id(3)).toThrowError(ERROR_MESSAGES.entity._abstruct.newIdError.detail)
    })

    test('equalsメソッドが正しく機能すること', () => {
        const entity = new CategoryEntity(testValueObjects)
        const same_entity = new CategoryEntity(testValueObjects)

        const { id, ...values } = testValueObjects;
        const different_entity = new CategoryEntity(values)

        expect(entity.equals(same_entity)).toBe(true)
        expect(entity.equals(different_entity)).toBe(false)
    })
})