import { describe, expect, test } from "vitest";
import { ReceiptEntity } from "@models/entity";
import { CreatedAt, Id, ReceiptIsChecked, ReceiptLatitude, ReceiptLongitude} from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe('ReceiptEntityのテスト', () => {
    const id = new Id(1)
    const correct_values = {
        userId: new Id(2),
        isChecked: new ReceiptIsChecked(false),
        latitude: new ReceiptLatitude(90.00000),
        longitude: new ReceiptLongitude(180.00000),
        createdAt: new CreatedAt(new Date('2025-08-29'))
    }

    test('DB挿入前のオブジェクトをインスタンス化できること', () => {
        expect(() => new ReceiptEntity({
            userId: correct_values.userId,
            isChecked: correct_values.isChecked,
            latitude: correct_values.latitude,
            longitude: correct_values.longitude
        })).not.toThrowError()
    })

    test('DB挿入後のオブジェクトをインスタンス化できること', () => {
        expect(() => new ReceiptEntity(correct_values, id)).not.toThrowError()
    })

    test('各プロパティに対して適切なエラーメッセージを返すこと', () => {
        expect(() => new ReceiptEntity({
            ...correct_values,
            userId: "間違った値"
        })).toThrow(ERROR_MESSAGES.entity.receipt.userIdInstanceofError)

        expect(() => new ReceiptEntity({
            ...correct_values,
            isChecked: "間違った値"
        })).toThrow(ERROR_MESSAGES.entity.receipt.isCheckedInstanceofError)

        expect(() => new ReceiptEntity({
            ...correct_values,
            latitude: "間違った値"
        })).toThrow(ERROR_MESSAGES.entity.receipt.latitudeInstanceofError)


        expect(() => new ReceiptEntity({
            ...correct_values,
            longitude: "間違った値"
        })).toThrow(ERROR_MESSAGES.entity.receipt.longitudeInstanceofError)

        expect(() => new ReceiptEntity({
            ...correct_values,
            createdAt: "間違った値"
        })).toThrow(ERROR_MESSAGES.entity._share.createdAt)
    })

    test('各ゲッターメソッドが正しく値を返すこと', () => {
        expect(new ReceiptEntity(correct_values, id).id).toEqual(id)

        expect(new ReceiptEntity(correct_values).getValues).toEqual(correct_values)

        expect(new ReceiptEntity(correct_values).userId).toEqual(correct_values.userId)
    })

    test('idセッターが正しく機能すること', () => {
        const entity = new ReceiptEntity(correct_values)
        entity.newId = new Id(2)
        expect(entity.id).toEqual(new Id(2));

        expect(() => entity.newId = new Id(3)).toThrowError(ERROR_MESSAGES.entity._abstruct.setIdError.detail)
    })

    test('toggleIsCheckedが正しく機能すること', () => {
        const entity = new ReceiptEntity(correct_values)
        entity.toggleIsChecked()

        expect(entity.getValues.isChecked).toEqual(new ReceiptIsChecked(true));
    })

    test('equalsメソッドが正しく機能すること', () => {
        const entity = new ReceiptEntity(correct_values)
        const same_entity = new ReceiptEntity(correct_values)
        const different_entity = new ReceiptEntity(correct_values, new Id(2))

        expect(entity.equals(same_entity)).toBe(true)
        expect(entity.equals(different_entity)).toBe(false)
    })
})