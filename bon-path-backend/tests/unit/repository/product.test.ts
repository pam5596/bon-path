import { describe, expect, it } from "vitest";
import { CreatedAt, Id, ProductImage, ProductLink, ProductName, ProductPrice } from "@models/valueObject";
import { ProductEntity } from "@models/entity";
import { ProductRepository } from "@repository";
import { PrismaMock } from "./_prisma";

describe('ProductRepositoryのMockテスト', () => {
    const mockResolvedValue = {
        storeId: 2,
        categoryId: 3,
        price: 2000,
        image: "https://vitest.dev/image",
        link: "https://vitest.dev/context",
        name: "あううぃああバナナ",
        createdAt: new Date('2025-09-10'),
        id: 1
    }

    const testValues = {
        id: new Id(mockResolvedValue.id),
        createdAt: new CreatedAt(mockResolvedValue.createdAt),
        storeId: new Id(mockResolvedValue.storeId),
        categoryId: new Id(mockResolvedValue.categoryId),
        price: new ProductPrice(mockResolvedValue.price),
        image: new ProductImage(mockResolvedValue.image),
        name: new ProductName(mockResolvedValue.name),
        link: new ProductLink(mockResolvedValue.link)
    }

    const repository = new ProductRepository(PrismaMock as any);

    it('insertManyが正常に呼び出されること', async () => {
        const insertManymockResolvedValue = Array(10).fill(mockResolvedValue)
        PrismaMock.product.createManyAndReturn.mockResolvedValue(insertManymockResolvedValue);

        const { id: _id, createdAt: _ca, ...values } = testValues;
        const entity = new ProductEntity(values);
        const result = await repository.insertMany(Array(10).fill(entity));
        
        const { id: __id, createdAt: __ca, ...calledData } = mockResolvedValue;
        expect(PrismaMock.product.createManyAndReturn).toHaveBeenCalledWith({
            data: Array(10).fill(calledData)
        });
        expect(result).toEqual(Array(10).fill(new ProductEntity(testValues)));
    });

    it('selectByIdがnullでないときでも正常に呼び出されること', async () => {
        PrismaMock.product.findUnique.mockResolvedValue(mockResolvedValue);

        const result = await repository.selectById(testValues.id);

        expect(PrismaMock.product.findUnique).toHaveBeenCalledWith({
            where: {
                id: mockResolvedValue.id
            },
        });
        expect(result).toEqual(new ProductEntity(testValues));
    });

    it('selectByIdがnullでも正常に呼び出されること', async () => {
        PrismaMock.product.findUnique.mockResolvedValue(null);

        const result = await repository.selectById(testValues.id)

        expect(PrismaMock.product.findUnique).toHaveBeenCalledWith({
            where: {
                id: mockResolvedValue.id
            },
        });
        expect(result).toEqual(null);
    })

    it('selectByStoreIdが正常に呼び出されること', async () => {
        const selectByStoreIdmockResolvedValue = Array(10).fill(mockResolvedValue)
        PrismaMock.product.findMany.mockResolvedValue(selectByStoreIdmockResolvedValue);

        const result = await repository.selectByStoreId(testValues.storeId)

        expect(PrismaMock.product.findMany).toHaveBeenCalledWith({
            where: {
                storeId: mockResolvedValue.storeId
            }
        });
        expect(result).toEqual(
            selectByStoreIdmockResolvedValue.map((product) => ProductEntity.fromPrimitives(product))
        )
    })

    it('selectByCategoryIdが正常に呼び出されること', async () => {
        const selectByStoreIdmockResolvedValue = Array(10).fill(mockResolvedValue)
        PrismaMock.product.findMany.mockResolvedValue(selectByStoreIdmockResolvedValue);

        const result = await repository.selectByCategoryId(testValues.categoryId)

        expect(PrismaMock.product.findMany).toHaveBeenCalledWith({
            where: {
                categoryId: mockResolvedValue.categoryId
            }
        });
        expect(result).toEqual(
            selectByStoreIdmockResolvedValue.map((product) => ProductEntity.fromPrimitives(product))
        )
    })

    it('updateが正常に呼び出されること', async () => {
        const entity = new ProductEntity(testValues)
        await repository.update(entity);

        expect(PrismaMock.product.update).toHaveBeenCalledWith({
            where: {
                id: entity.id!.value
            },
            data: entity.toPrimitives
        });
    })

    it('deleteByIdが正常に呼び出されること', async () => {
        await repository.deleteById(testValues.id)

        expect(PrismaMock.product.delete).toHaveBeenCalledWith({
            where: {
                id: testValues.id.value
            }
        })
    })
})