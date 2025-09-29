import { describe, expect, test } from "vitest";
import { ProductEntity } from "@models/entity";
import { CreatedAt, Id, ProductImage, ProductLink, ProductName, ProductPrice } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe('ProductEntityのテスト', () => {
    const testPrimitives = {
        id: 1,
        storeId: 2,
        categoryId: 3,
        image: "https://vitest.dev/image",
        name: "あううぃああ商品",
        price: 100,
        link: "https://vitest.dev/context",
        createdAt: new Date('2025-08-29')
    }
    
    const testValueObjects = {
        id: new Id(testPrimitives.id),
        storeId: new Id(testPrimitives.storeId),
        categoryId: new Id(testPrimitives.categoryId),
        image: new ProductImage(testPrimitives.image),
        name: new ProductName(testPrimitives.name),
        price: new ProductPrice(testPrimitives.price),
        link: new ProductLink(testPrimitives.link),
        createdAt: new CreatedAt(testPrimitives.createdAt)
    }

    test('DB挿入前のオブジェクトをインスタンス化できること', () => {
        const { id, createdAt, ...values } = testValueObjects;
        expect(() => new ProductEntity(values)).not.toThrowError()
    })

    test('DB挿入後のオブジェクトをインスタンス化できること', () => {
        expect(() => new ProductEntity(testValueObjects)).not.toThrowError()
    })

    test('fromPrimitivesが生のオブジェクトをインスタンス化できること', () => {
        expect(ProductEntity.fromPrimitives(testPrimitives)).toEqual(new ProductEntity(testValueObjects))
    })

    test('各ゲッターメソッドが正しく値を返すこと', () => {
        expect(new ProductEntity(testValueObjects).id).toEqual(testValueObjects.id)
        
        const { id: voId, createdAt: voCreatedAt, ...voValues } = testValueObjects;
        expect(new ProductEntity(testValueObjects).getValues).toEqual(voValues)

        expect(new ProductEntity(testValueObjects).storeId).toEqual(testValueObjects.storeId)

        const { id: prId, createdAt: prCreatedAt, ...prValues } = testPrimitives;
        expect(new ProductEntity(testValueObjects).toPrimitives).toEqual(prValues)
    })

    test('idセッターが正しく機能すること', () => {
        const { id, createdAt, ...values } = testValueObjects;  
        const entity = new ProductEntity(values)
        entity.newId = new Id(2)
        expect(entity.id).toEqual(new Id(2));

        expect(() => entity.newId = new Id(3)).toThrowError(ERROR_MESSAGES.entity._abstruct.newIdError.detail)
    })

    test('valuesセッターが正しく機能すること', () => {
        const entity = new ProductEntity(testValueObjects)
        const new_values = {
            image: new ProductImage("https://vitest.dev/image"),
            link: new ProductLink("https://vitest.dev/context2"),
            name: new ProductName("あいうえお商品"),
            price: new ProductPrice(120)
        }

        entity.newValues = new_values
        expect(entity.getValues.image).toEqual(new_values.image);
        expect(entity.getValues.name).toEqual(new_values.name);
        expect(entity.getValues.price).toEqual(new_values.price);
        expect(entity.getValues.link).toEqual(new_values.link);
    })

    test('equalsメソッドが正しく機能すること', () => {
        const entity = new ProductEntity(testValueObjects)
        const same_entity = new ProductEntity(testValueObjects)
        
        const { id, ...values } = testValueObjects;
        const different_entity = new ProductEntity({ id: new Id(3), ...values})

        expect(entity.equals(same_entity)).toBe(true)
        expect(entity.equals(different_entity)).toBe(false)
    })
})