import { describe, expect, test } from "vitest";
import { ReceiptImageEntity } from "@models/entity";
import { CreatedAt, Id, ReceiptImageUrl } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe('ReceiptImageEntityのテスト', () => {
    const testPrimitives = {
        id: 1,
        receiptId: 2,
        url: "/vitest.dev/",
        createdAt: new Date('2025-08-29')
    }

    const testValueObjects = {
        id: new Id(testPrimitives.id),
        receiptId: new Id(testPrimitives.receiptId),
        url: new ReceiptImageUrl(testPrimitives.url),
        createdAt: new CreatedAt(testPrimitives.createdAt)
    }

    test('DB挿入前のオブジェクトをインスタンス化できること', () => {
        const { id, createdAt, ...values } = testValueObjects;
        expect(() => new ReceiptImageEntity(values)).not.toThrowError()
    })

    test('DB挿入後のオブジェクトをインスタンス化できること', () => {
        expect(() => new ReceiptImageEntity(testValueObjects)).not.toThrowError()
    })


    test('各ゲッターメソッドが正しく値を返すこと', () => {
        expect(new ReceiptImageEntity(testValueObjects).id).toEqual(testValueObjects.id)
        
        const { id: voId, createdAt: voCreatedAt, ...voValues } = testValueObjects;
        expect(new ReceiptImageEntity(testValueObjects).getValues).toEqual(voValues)

        expect(new ReceiptImageEntity(testValueObjects).receiptId).toEqual(testValueObjects.receiptId)

        const { id: prId, createdAt: prCreatedAt, ...prValues } = testPrimitives;
        expect(new ReceiptImageEntity(testValueObjects).toPrimitives).toEqual(prValues)
    })

    test('idセッターが正しく機能すること', () => {
        const { id, createdAt, ...values } = testValueObjects;  
        const entity = new ReceiptImageEntity(values)
        entity.newId = new Id(2)
        expect(entity.id).toEqual(new Id(2));

        expect(() => entity.newId = new Id(3)).toThrowError(ERROR_MESSAGES.entity._abstruct.newIdError.detail)
    })

    test('equalsメソッドが正しく機能すること', () => {
        const entity = new ReceiptImageEntity(testValueObjects)
        const same_entity = new ReceiptImageEntity(testValueObjects)
        
        const { id, ...values } = testValueObjects;
        const different_entity = new ReceiptImageEntity({ id: new Id(3), ...values})

        expect(entity.equals(same_entity)).toBe(true)
        expect(entity.equals(different_entity)).toBe(false)
    })
})