import { describe, expect, test } from "vitest";
import { StoreEntity } from "@models/entity";
import { CreatedAt, Id, StoreGoogleMapLink, StoreImage, StoreLatitude, StoreLongitude, StoreName } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe('StoreEntityのテスト', () => {
    const testPrimitives = {
        id: 1,
        googleMapLink: "https://vitest.dev/link",
        image: "https://vitest.dev/image",
        name: "あううぃああ店",
        latitude: 90.0000,
        longitude: 180.0000,
        createdAt: new Date('2025-08-29')
    }

    const testValueObjects = {
        id: new Id(testPrimitives.id),
        googleMapLink: new StoreGoogleMapLink(testPrimitives.googleMapLink),
        image: new StoreImage(testPrimitives.image),
        name: new StoreName(testPrimitives.name),
        latitude: new StoreLatitude(testPrimitives.latitude),
        longitude: new StoreLongitude(testPrimitives.longitude),
        createdAt: new CreatedAt(new Date('2025-08-29'))
    }

    test('DB挿入前のオブジェクトをインスタンス化できること', () => {
        expect(() => new StoreEntity({
            name: testValueObjects.name
        })).not.toThrowError()
    })

    test('DB挿入後のオブジェクトをインスタンス化できること', () => {
        expect(() => new StoreEntity(testValueObjects)).not.toThrowError()
    })

    test('fromPrimitivesが生のオブジェクトをインスタンス化できること', () => {
        expect(StoreEntity.fromPrimitives(testPrimitives)).toEqual(new StoreEntity(testValueObjects))
    })

    test('各ゲッターメソッドが正しく値を返すこと', () => {
        expect(new StoreEntity(testValueObjects).id).toEqual(testValueObjects.id)
        
        const { id: voId, createdAt: voCreatedAt, ...voValues } = testValueObjects;
        expect(new StoreEntity(testValueObjects).getValues).toEqual(voValues)

        const { id: prId, createdAt: prCreatedAt, ...prValues } = testPrimitives;
        expect(new StoreEntity(testValueObjects).toPrimitives).toEqual(prValues)
    })

    test('idセッターが正しく機能すること', () => {
        const { id, createdAt, ...values } = testValueObjects;
        const entity = new StoreEntity(values)
        entity.newId = new Id(2)
        expect(entity.id).toEqual(new Id(2));

        expect(() => entity.newId = new Id(3)).toThrowError(ERROR_MESSAGES.entity._abstruct.newIdError.detail)
    })

    test('valuesセッターが正しく機能すること', () => {
        const entity = new StoreEntity(testValueObjects)
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
        const entity = new StoreEntity(testValueObjects)
        const same_entity = new StoreEntity(testValueObjects)

        const { id, ...values } = testValueObjects;
        const different_entity = new StoreEntity({ id: new Id(3), ...values})
        
        expect(entity.equals(same_entity)).toBe(true)
        expect(entity.equals(different_entity)).toBe(false)
    })
})