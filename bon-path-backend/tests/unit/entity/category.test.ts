import { describe, expect, test } from "vitest";
import { CategoryEntity } from "@models/entity";
import { CreatedAt, Id, CategoryName } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe('CategoryEntityのテスト', () => {
    const id = new Id(1)
    const correct_values = {
        parentId: new Id(2),
        name: new CategoryName("カテゴリー名"),
        createdAt: new CreatedAt(new Date('2025-09-03'))
    }

    test('DB挿入前のオブジェクトをインスタンス化できること', () => {
        expect(() => new CategoryEntity({
            parentId: correct_values.parentId,
            name: correct_values.name
        })).not.toThrowError()
    })

    test('DB挿入後のオブジェクトをインスタンス化できること', () => {
        expect(() => new CategoryEntity(correct_values, id)).not.toThrowError()
    })

    test('各プロパティに対して適切なエラーメッセージを返すこと', () => {
        expect(() => new CategoryEntity({
            ...correct_values,
            parentId: "間違った値"
        })).toThrow()

        expect(() => new CategoryEntity({
            ...correct_values,
            name: "間違った値"
        })).toThrow()

        expect(() => new CategoryEntity({
            ...correct_values,
            createdAt: "間違った値"
        })).toThrow()
    })

    test('各ゲッターメソッドが正しく値を返すこと', () => {
        expect(new CategoryEntity(correct_values, id).id).toEqual(id)

        expect(new CategoryEntity(correct_values).getValues).toEqual(correct_values)

        expect(new CategoryEntity(correct_values).parentId).toEqual(correct_values.parentId)

        expect(new CategoryEntity(correct_values).toPrimitives).toEqual(
            Object.fromEntries(
                Object.entries(correct_values).map(([k,v]) => [k, v.value])
            )
        )
    })

    test('idセッターが正しく機能すること', () => {
        const entity = new CategoryEntity(correct_values)
        entity.newId = new Id(2)
        expect(entity.id).toEqual(new Id(2));

        expect(() => entity.newId = new Id(3)).toThrowError(ERROR_MESSAGES.entity._abstruct.newIdError.detail)
    })

    test('equalsメソッドが正しく機能すること', () => {
        const entity = new CategoryEntity(correct_values)
        const same_entity = new CategoryEntity(correct_values)
        const different_entity = new CategoryEntity(correct_values, new Id(2))

        expect(entity.equals(same_entity)).toBe(true)
        expect(entity.equals(different_entity)).toBe(false)
    })
})