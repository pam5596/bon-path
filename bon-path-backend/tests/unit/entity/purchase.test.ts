import { describe, expect, test } from "vitest";
import { PurchaseEntity } from "@models/entity";
import { CreatedAt, Id, PurchasePrice, PurchaseQuantity } from "@models/valueObject";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

describe('PurchaseEntityのテスト', () => {    
    const testPrimitives = {
        id: 1,
        userId: 2,
        receiptId: 3,
        storeId: 4,
        productId: 5,
        quantity: 10,
        price: 100,
        createdAt: new Date('2025-09-03')
    }
    
    const testValueObjects = {
        id: new Id(testPrimitives.id),
        userId: new Id(testPrimitives.userId),
        receiptId: new Id(testPrimitives.receiptId),
        storeId: new Id(testPrimitives.storeId),
        productId: new Id(testPrimitives.productId),
        quantity: new PurchaseQuantity(testPrimitives.quantity),
        price: new PurchasePrice(testPrimitives.price),
        createdAt: new CreatedAt(testPrimitives.createdAt)
    }

    test('DB挿入前のオブジェクトをインスタンス化できること', () => {
        const { id, createdAt, ...values } = testValueObjects;
        expect(() => new PurchaseEntity(values)).not.toThrowError()
    })

    test('DB挿入後のオブジェクトをインスタンス化できること', () => {
        expect(() => new PurchaseEntity(testValueObjects)).not.toThrowError()
    })

    test('fromPrimitivesが生のオブジェクトをインスタンス化できること', () => {
        expect(PurchaseEntity.fromPrimitives(testPrimitives)).toEqual(new PurchaseEntity(testValueObjects))
    })

    test('各ゲッターメソッドが正しく値を返すこと', () => {
        expect(new PurchaseEntity(testValueObjects).id).toEqual(testValueObjects.id)
        
        const { id: voId, createdAt: voCreatedAt, ...voValues } = testValueObjects;
        expect(new PurchaseEntity(testValueObjects).getValues).toEqual(voValues)

        expect(new PurchaseEntity(testValueObjects).userId).toEqual(testValueObjects.userId)

        expect(new PurchaseEntity(testValueObjects).receiptId).toEqual(testValueObjects.receiptId)

        expect(new PurchaseEntity(testValueObjects).storeId).toEqual(testValueObjects.storeId)

        expect(new PurchaseEntity(testValueObjects).productId).toEqual(testValueObjects.productId)

        const { id: prId, createdAt: prCreatedAt, ...prValues } = testPrimitives;
        expect(new PurchaseEntity(testValueObjects).toPrimitives).toEqual(prValues)
    })

    test('idセッターが正しく機能すること', () => {
        const { id, createdAt, ...values } = testValueObjects;  
        const entity = new PurchaseEntity(values)
        entity.newId = new Id(2)
        expect(entity.id).toEqual(new Id(2));

        expect(() => entity.newId = new Id(3)).toThrowError(ERROR_MESSAGES.entity._abstruct.newIdError.detail)
    })

    test('equalsメソッドが正しく機能すること', () => {
        const entity = new PurchaseEntity(testValueObjects)
        const same_entity = new PurchaseEntity(testValueObjects)
        
        const { id, ...values } = testValueObjects;
        const different_entity = new PurchaseEntity({ id: new Id(3), ...values})

        expect(entity.equals(same_entity)).toBe(true)
        expect(entity.equals(different_entity)).toBe(false)
    })
})