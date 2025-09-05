import { describe, expect, test } from "vitest";
import { ProductEntity } from "@models/entity";
import { CreatedAt, Id, ProductImage, ProductName, ProductPrice } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe('ProductEntityのテスト', () => {
    const id = new Id(1)
    const correct_values = {
        storeId: new Id(2),
        categoryId: new Id(3),
        image: new ProductImage("https://vitest.dev/image"),
        name: new ProductName("あううぃああ商品"),
        price: new ProductPrice(100),
        createdAt: new CreatedAt(new Date('2025-08-29'))
    }

    test('DB挿入前のオブジェクトをインスタンス化できること', () => {
        expect(() => new ProductEntity({
            storeId: correct_values.storeId,
            categoryId: correct_values.categoryId,
            name: correct_values.name,
            price: correct_values.price
        })).not.toThrowError()
    })

    test('DB挿入後のオブジェクトをインスタンス化できること', () => {
        expect(() => new ProductEntity(correct_values, id)).not.toThrowError()
    })

    test('各プロパティに対して適切なエラーメッセージを返すこと', () => {
        expect(() => new ProductEntity({
            ...correct_values,
            storeId: "間違った値"
        })).toThrow(ERROR_MESSAGES.entity.product.storeIdInstanceofError)

        expect(() => new ProductEntity({
            ...correct_values,
            categoryId: "間違った値"
        })).toThrow(ERROR_MESSAGES.entity.product.categoryIdInstanceofError)

        expect(() => new ProductEntity({
            ...correct_values,
            name: "間違った値"
        })).toThrow(ERROR_MESSAGES.entity.product.nameInstanceofError)


        expect(() => new ProductEntity({
            ...correct_values,
            image: "間違った値"
        })).toThrow(ERROR_MESSAGES.entity.product.imageInstanceofError)

        expect(() => new ProductEntity({
            ...correct_values,
            price: "間違った値"
        })).toThrow(ERROR_MESSAGES.entity.product.priceInstanceofError)

        expect(() => new ProductEntity({
            ...correct_values,
            createdAt: "間違った値"
        })).toThrow(ERROR_MESSAGES.entity._share.createdAt)
    })

    test('各ゲッターメソッドが正しく値を返すこと', () => {
        expect(new ProductEntity(correct_values, id).id).toEqual(id)

        expect(new ProductEntity(correct_values).getValues).toEqual(correct_values)
    })

    test('idセッターが正しく機能すること', () => {
        const entity = new ProductEntity(correct_values)
        entity.newId = new Id(2)
        expect(entity.id).toEqual(new Id(2));

        expect(() => entity.newId = new Id(3)).toThrowError(ERROR_MESSAGES.entity._abstruct.setIdError.detail)
    })

    test('valuesセッターが正しく機能すること', () => {
        const entity = new ProductEntity(correct_values)
        const new_values = {
            image: new ProductImage("https://vitest.dev/image2"),
            name: new ProductName("あいうえお商品"),
            price: new ProductPrice(120)
        }

        entity.newValues = new_values
        expect(entity.getValues.image).toEqual(new_values.image);
        expect(entity.getValues.name).toEqual(new_values.name);
        expect(entity.getValues.price).toEqual(new_values.price);
    })

    test('equalsメソッドが正しく機能すること', () => {
        const entity = new ProductEntity(correct_values)
        const same_entity = new ProductEntity(correct_values)
        const different_entity = new ProductEntity(correct_values, new Id(2))

        expect(entity.equals(same_entity)).toBe(true)
        expect(entity.equals(different_entity)).toBe(false)
    })
})