import { describe, expect, it } from "vitest";
import { CreatedAt, Id, ProductImage, ProductName, ProductPrice } from "@models/valueObject";
import { ProductEntity } from "@models/entity";
import { ProductRepository } from "@repository";
import { PrismaMock } from "./_prisma";

describe('ProductRepositoryのMockテスト', () => {
    const mockResolvedValue = {
        storeId: 2,
        categoryId: 3,
        price: 2000,
        image: "https://vitest.dev/image",
        name: "あううぃああバナナ",
        createdAt: new Date('2025-09-10'),
        id: 1
    }

    const testId = new Id(mockResolvedValue.id)
    const testCreatedAt = new CreatedAt(mockResolvedValue.createdAt)
    const testValues = {
        storeId: new Id(mockResolvedValue.storeId),
        categoryId: new Id(mockResolvedValue.categoryId),
        price: new ProductPrice(mockResolvedValue.price),
        image: new ProductImage(mockResolvedValue.image),
        name: new ProductName(mockResolvedValue.name),
    }

    const repository = new ProductRepository(PrismaMock as any);

    it('insertが正常に呼び出されること', async () => {
        PrismaMock.product.create.mockResolvedValue(mockResolvedValue);

        const entity = new ProductEntity(testValues);
        const result = await repository.insert(entity);
        
        const { id, createdAt, ...calledData } = mockResolvedValue;
        expect(PrismaMock.product.create).toHaveBeenCalledWith({
            data: calledData
        });
        expect(result).toEqual(new ProductEntity(testValues, testId, testCreatedAt));
    });

    it('selectByIdがnullでないときでも正常に呼び出されること', async () => {
        PrismaMock.product.findUnique.mockResolvedValue(mockResolvedValue);

        const result = await repository.selectById(testId);

        expect(PrismaMock.product.findUnique).toHaveBeenCalledWith({
            where: {
                id: mockResolvedValue.id
            },
        });
        expect(result).toEqual(new ProductEntity(testValues, testId, testCreatedAt));
    });

    it('selectByIdがnullでも正常に呼び出されること', async () => {
        PrismaMock.product.findUnique.mockResolvedValue(null);

        const result = await repository.selectById(testId)

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
            selectByStoreIdmockResolvedValue.map((product) => new ProductEntity({
                storeId: new Id(product.storeId),
                categoryId: new Id(product.categoryId),
                name: new ProductName(product.name),
                image: new ProductImage(product.image),
                price: new ProductPrice(product.price)
            }, new Id(product.id), new CreatedAt(product.createdAt)))
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
            selectByStoreIdmockResolvedValue.map((product) => new ProductEntity({
                storeId: new Id(product.storeId),
                categoryId: new Id(product.categoryId),
                name: new ProductName(product.name),
                image: new ProductImage(product.image),
                price: new ProductPrice(product.price)
            }, new Id(product.id), new CreatedAt(product.createdAt)))
        )
    })

    it('updateが正常に呼び出されること', async () => {
        const entity = new ProductEntity(testValues, testId)
        await repository.update(entity);

        expect(PrismaMock.product.update).toHaveBeenCalledWith({
            where: {
                id: entity.id!.value
            },
            data: entity.getRowValues
        });
    })

    it('deleteByIdが正常に呼び出されること', async () => {
        await repository.deleteById(testId)

        expect(PrismaMock.product.delete).toHaveBeenCalledWith({
            where: {
                id: testId.value
            }
        })
    })
})