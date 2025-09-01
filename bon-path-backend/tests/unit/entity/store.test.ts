import { describe, expect, test } from "vitest";
import { StoreEntity } from "@models/entity";
import { CreatedAt, Id, StoreGoogleMapLink, StoreImage, StoreLatitude, StoreLongitude, StoreName } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe('StoreEntityのテスト', () => {
    const id = new Id(1)
    const correct_values = {
        googleMapLink: new StoreGoogleMapLink("https://vitest.dev/link"),
        image: new StoreImage("https://vitest.dev/image"),
        name: new StoreName("あううぃああ店"),
        latitude: new StoreLatitude(90.00000),
        longitude: new StoreLongitude(180.00000),
        createdAt: new CreatedAt(new Date('2025-08-29'))
    }

    test('DB挿入前のオブジェクトをインスタンス化できること', () => {
        expect(() => new StoreEntity({
            name: correct_values.name
        })).not.toThrowError()
    })

    test('DB挿入後のオブジェクトをインスタンス化できること', () => {
        expect(() => new StoreEntity(correct_values, id)).not.toThrowError()
    })

    test('各プロパティに対して適切なエラーメッセージを返すこと', () => {
        expect(() => new StoreEntity({
            ...correct_values,
            name: "間違った値"
        })).toThrow(ERROR_MESSAGES.entity.store.nameInstanceofError)

        expect(() => new StoreEntity({
            ...correct_values,
            image: "間違った値"
        })).toThrow(ERROR_MESSAGES.entity.store.imageInstanceofError)

        expect(() => new StoreEntity({
            ...correct_values,
            latitude: "間違った値"
        })).toThrow(ERROR_MESSAGES.entity.store.latitudeInstanceofError)


        expect(() => new StoreEntity({
            ...correct_values,
            longitude: "間違った値"
        })).toThrow(ERROR_MESSAGES.entity.store.longitudeInstanceofError)

        expect(() => new StoreEntity({
            ...correct_values,
            googleMapLink: "間違った値"
        })).toThrow(ERROR_MESSAGES.entity.store.googleMapLinkInstanceofError)

        expect(() => new StoreEntity({
            ...correct_values,
            createdAt: "間違った値"
        })).toThrow(ERROR_MESSAGES.entity._share.createdAt)
    })

    test('各ゲッターメソッドが正しく値を返すこと', () => {
        expect(new StoreEntity(correct_values, id).id).toEqual(id)

        expect(new StoreEntity(correct_values).getValues).toEqual(correct_values)
    })

    test('idセッターが正しく機能すること', () => {
        const entity = new StoreEntity(correct_values)
        entity.newId = new Id(2)
        expect(entity.id).toEqual(new Id(2));

        expect(() => entity.newId = new Id(3)).toThrowError(ERROR_MESSAGES.entity._abstruct.setIdError.detail)
    })

    test('valuesセッターが正しく機能すること', () => {
        const entity = new StoreEntity(correct_values)
        const new_values = {
            image: new StoreImage("https://vitest.dev/image2"),
            latitude: new StoreLatitude(0.00000),
            longitude: new StoreLongitude(0.0000),
            googleMapLink: new StoreGoogleMapLink("https://vitest.dev/link2")
        }

        entity.newValues = new_values
        expect(entity.getValues.image).toEqual(new_values.image);
        expect(entity.getValues.latitude).toEqual(new_values.latitude);
        expect(entity.getValues.longitude).toEqual(new_values.longitude);
        expect(entity.getValues.googleMapLink).toEqual(new_values.googleMapLink);
    })

    test('equalsメソッドが正しく機能すること', () => {
        const entity = new StoreEntity(correct_values)
        const same_entity = new StoreEntity(correct_values)
        const different_entity = new StoreEntity(correct_values, new Id(2))

        expect(entity.equals(same_entity)).toBe(true)
        expect(entity.equals(different_entity)).toBe(false)
    })
})