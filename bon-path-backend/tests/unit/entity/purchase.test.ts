import { describe, expect, test } from "vitest";
import { PurchaseEntity } from "@models/entity";
import { CreatedAt, Id, PurchasePrice, PurchaseQuantity } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe('PurchaseEntityのテスト', () => {
    const id = new Id(1)
    const correct_values = {
        userId: new Id(2),
        receiptId: new Id(3),
        storeId: new Id(4),
        productId: new Id(5),
        quantity: new PurchaseQuantity(6),
        price: new PurchasePrice(100),
        createdAt: new CreatedAt(new Date('2025-09-03'))
    }

    test('DB挿入前のオブジェクトをインスタンス化できること', () => {
        expect(() => new PurchaseEntity({
            userId: correct_values.userId,
            receiptId: correct_values.receiptId,
            storeId: correct_values.storeId,
            productId: correct_values.productId,
            quantity: correct_values.quantity,
            price: correct_values.price
        })).not.toThrowError()
    })

    test('DB挿入後のオブジェクトをインスタンス化できること', () => {
        expect(() => new PurchaseEntity(correct_values, id)).not.toThrowError()
    })

    test('各プロパティに対して適切なエラーメッセージを返すこと', () => {
        expect(() => new PurchaseEntity({
            ...correct_values,
            userId: "間違った値"
        })).toThrow()

        expect(() => new PurchaseEntity({
            ...correct_values,
            receiptId: "間違った値"
        })).toThrow()

        expect(() => new PurchaseEntity({
            ...correct_values,
            storeId: "間違った値"
        })).toThrow()

        expect(() => new PurchaseEntity({
            ...correct_values,
            productId: "間違った値"
        })).toThrow()

        expect(() => new PurchaseEntity({
            ...correct_values,
            quantity: "間違った値"
        })).toThrow()

        expect(() => new PurchaseEntity({
            ...correct_values,
            price: "間違った値"
        })).toThrow()

        expect(() => new PurchaseEntity({
            ...correct_values,
            createdAt: "間違った値"
        })).toThrow()
    })

    test('各ゲッターメソッドが正しく値を返すこと', () => {
        expect(new PurchaseEntity(correct_values, id).id).toEqual(id)

        expect(new PurchaseEntity(correct_values).getValues).toEqual(correct_values)

        expect(new PurchaseEntity(correct_values).userId).toEqual(correct_values.userId)

        expect(new PurchaseEntity(correct_values).receiptId).toEqual(correct_values.receiptId)

        expect(new PurchaseEntity(correct_values).storeId).toEqual(correct_values.storeId)

        expect(new PurchaseEntity(correct_values).productId).toEqual(correct_values.productId)

        expect(new PurchaseEntity(correct_values).getRowValues).toEqual(
            Object.fromEntries(
                Object.entries(correct_values).map(([k,v]) => [k, v.value])
            )
        )
    })

    test('idセッターが正しく機能すること', () => {
        const entity = new PurchaseEntity(correct_values)
        entity.newId = new Id(2)
        expect(entity.id).toEqual(new Id(2));

        expect(() => entity.newId = new Id(3)).toThrowError(ERROR_MESSAGES.entity._abstruct.newIdError.detail)
    })

    test('equalsメソッドが正しく機能すること', () => {
        const entity = new PurchaseEntity(correct_values)
        const same_entity = new PurchaseEntity(correct_values)
        const different_entity = new PurchaseEntity(correct_values, new Id(2))

        expect(entity.equals(same_entity)).toBe(true)
        expect(entity.equals(different_entity)).toBe(false)
    })
})