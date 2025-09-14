import { describe, expect, test } from "vitest";
import { ReceiptEntity } from "@models/entity";
import { CreatedAt, Id, ReceiptIsChecked, ReceiptLatitude, ReceiptLongitude} from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe('ReceiptEntityのテスト', () => {
    const testPrimitives = {
        id: 1,
        userId: 2,
        isChecked: false,
        latitude: 90.0000,
        longitude: 180.0000,
        createdAt: new Date('2025-08-29')
    }

    const testValueObjects = {
        id: new Id(testPrimitives.id),
        userId: new Id(testPrimitives.userId),
        isChecked: new ReceiptIsChecked(testPrimitives.isChecked),
        latitude: new ReceiptLatitude(testPrimitives.latitude),
        longitude: new ReceiptLongitude(testPrimitives.longitude),
        createdAt: new CreatedAt(testPrimitives.createdAt)
    }

    test('DB挿入前のオブジェクトをインスタンス化できること', () => {
        const { id, createdAt, ...values } = testValueObjects;
        expect(() => new ReceiptEntity(values)).not.toThrowError()
    })

    test('DB挿入後のオブジェクトをインスタンス化できること', () => {
        expect(() => new ReceiptEntity(testValueObjects)).not.toThrowError()
    })

    test('fromPrimitivesが生のオブジェクトをインスタンス化できること', () => {
        expect(ReceiptEntity.fromPrimitives(testPrimitives)).toEqual(new ReceiptEntity(testValueObjects))
    })

    test('各ゲッターメソッドが正しく値を返すこと', () => {
        expect(new ReceiptEntity(testValueObjects).id).toEqual(testValueObjects.id)
        
        const { id: voId, createdAt: voCreatedAt, ...voValues } = testValueObjects;
        expect(new ReceiptEntity(testValueObjects).getValues).toEqual(voValues)

        expect(new ReceiptEntity(testValueObjects).userId).toEqual(testValueObjects.userId)

        const { id: prId, createdAt: prCreatedAt, ...prValues } = testPrimitives;
        expect(new ReceiptEntity(testValueObjects).toPrimitives).toEqual(prValues)
    })

    test('idセッターが正しく機能すること', () => {
        const { id, createdAt, ...values } = testValueObjects;  
        const entity = new ReceiptEntity(values)
        entity.newId = new Id(2)
        expect(entity.id).toEqual(new Id(2));

        expect(() => entity.newId = new Id(3)).toThrowError(ERROR_MESSAGES.entity._abstruct.newIdError.detail)
    })

    test('toggleIsCheckedが正しく機能すること', () => {
        const entity = new ReceiptEntity(testValueObjects)
        entity.toggleIsChecked()

        expect(entity.getValues.isChecked).toEqual(new ReceiptIsChecked(true));
    })

    test('equalsメソッドが正しく機能すること', () => {
        const entity = new ReceiptEntity(testValueObjects)
        const same_entity = new ReceiptEntity(testValueObjects)
        
        const { id, ...values } = testValueObjects;
        const different_entity = new ReceiptEntity({ id: new Id(3), ...values})

        expect(entity.equals(same_entity)).toBe(true)
        expect(entity.equals(different_entity)).toBe(false)
    })
})