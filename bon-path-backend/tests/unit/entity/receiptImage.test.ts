import { describe, expect, test } from "vitest";
import { ReceiptImageEntity } from "@models/entity";
import { CreatedAt, Id, ReceiptImageUrl } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe('ReceiptImageEntityのテスト', () => {
    const id = new Id(1)
    const correct_values = {
        receiptId: new Id(2),
        url: new ReceiptImageUrl("https://vitest.dev/"),
        createdAt: new CreatedAt(new Date('2025-08-29'))
    }

    test('DB挿入前のオブジェクトをインスタンス化できること', () => {
        expect(() => new ReceiptImageEntity({
            receiptId: correct_values.receiptId,
            url: correct_values.url
        })).not.toThrowError()
    })

    test('DB挿入後のオブジェクトをインスタンス化できること', () => {
        expect(() => new ReceiptImageEntity(correct_values, id)).not.toThrowError()
    })

    test('各プロパティに対して適切なエラーメッセージを返すこと', () => {
        expect(() => new ReceiptImageEntity({
            ...correct_values,
            receiptId: "間違った値"
        })).toThrow()

        expect(() => new ReceiptImageEntity({
            ...correct_values,
            url: "間違った値"
        })).toThrow()

        expect(() => new ReceiptImageEntity({
            ...correct_values,
            createdAt: "間違った値"
        })).toThrow()
    })

    test('各ゲッターメソッドが正しく値を返すこと', () => {
        expect(new ReceiptImageEntity(correct_values, id).id).toEqual(id)

        expect(new ReceiptImageEntity(correct_values).getValues).toEqual(correct_values)

        expect(new ReceiptImageEntity(correct_values).receiptId).toEqual(correct_values.receiptId)
    })

    test('idセッターが正しく機能すること', () => {
        const entity = new ReceiptImageEntity(correct_values)
        entity.newId = new Id(2)
        expect(entity.id).toEqual(new Id(2));

        expect(() => entity.newId = new Id(3)).toThrowError(ERROR_MESSAGES.entity._abstruct.setIdError.detail)
    })

    test('equalsメソッドが正しく機能すること', () => {
        const entity = new ReceiptImageEntity(correct_values)
        const same_entity = new ReceiptImageEntity(correct_values)
        const different_entity = new ReceiptImageEntity(correct_values, new Id(2))

        expect(entity.equals(same_entity)).toBe(true)
        expect(entity.equals(different_entity)).toBe(false)
    })
})