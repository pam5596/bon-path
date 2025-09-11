import { describe, expect, it } from "vitest";
import { CreatedAt, Id, PurchasePrice, PurchaseQuantity } from "@models/valueObject";
import { PurchaseEntity } from "@models/entity";
import { PurchaseRepository } from "@repository";
import { PrismaMock } from "./_prisma";

describe('PurchaseRepositoryのMockテスト', () => {
    const mockResolvedValue = {
        createdAt: new Date('2025-09-11'),
        id: 1,
        userId: 2,
        receiptId: 3,
        productId: 4,
        storeId: 5,
        quantity: 6,
        price: 100
    }

    const testId = new Id(mockResolvedValue.id)
    const testCreatedAt = new CreatedAt(mockResolvedValue.createdAt)
    const testValues = {
        userId: new Id(mockResolvedValue.userId),
        receiptId: new Id(mockResolvedValue.receiptId),
        productId: new Id(mockResolvedValue.productId),
        storeId: new Id(mockResolvedValue.storeId),
        quantity: new PurchaseQuantity(mockResolvedValue.quantity),
        price: new PurchasePrice(mockResolvedValue.price)
    }

    const repository = new PurchaseRepository(PrismaMock as any)

    it('insertが正常に呼び出されること', async () => {
        PrismaMock.purchase.create.mockResolvedValue(mockResolvedValue);

        const entity = new PurchaseEntity(testValues);
        const result = await repository.insert(entity);
        
        const { id, createdAt, ...calledData } = mockResolvedValue;
        expect(PrismaMock.purchase.create).toHaveBeenCalledWith({
            data: calledData
        });
        expect(result).toEqual(new PurchaseEntity(testValues, testId, testCreatedAt));
    });

    it('selectByIdがnullでないときでも正常に呼び出されること', async () => {
        PrismaMock.purchase.findUnique.mockResolvedValue(mockResolvedValue);

        const result = await repository.selectById(testId);

        expect(PrismaMock.purchase.findUnique).toHaveBeenCalledWith({
            where: {
                id: mockResolvedValue.id
            },
        });
        expect(result).toEqual(new PurchaseEntity(testValues, testId, testCreatedAt));
    });

    it('selectByIdがnullでも正常に呼び出されること', async () => {
        PrismaMock.purchase.findUnique.mockResolvedValue(null);

        const result = await repository.selectById(testId)

        expect(PrismaMock.purchase.findUnique).toHaveBeenCalledWith({
            where: {
                id: mockResolvedValue.id
            },
        });
        expect(result).toEqual(null);
    })

    it('selectByUserIdが正常に呼び出されること', async () => {
        const selectByUserIdmockResolvedValue = Array(10).fill(mockResolvedValue)
        PrismaMock.purchase.findMany.mockResolvedValue(selectByUserIdmockResolvedValue);

        const result = await repository.selectByUserId(testValues.userId)

        expect(PrismaMock.purchase.findMany).toHaveBeenCalledWith({
            where: {
                userId: mockResolvedValue.userId
            }
        });
        expect(result).toEqual(
            selectByUserIdmockResolvedValue.map((purchase) => new PurchaseEntity({
                    userId: new Id(purchase.userId),
                    receiptId: new Id(purchase.receiptId),
                    storeId: new Id(purchase.storeId),
                    productId: new Id(purchase.productId),
                    quantity: new PurchaseQuantity(purchase.quantity),
                    price: new PurchasePrice(purchase.price)
                }, new Id(purchase.id), new CreatedAt(purchase.createdAt))
            )
        )
    })

    it('selectByReceiptIdが正常に呼び出されること', async () => {
        const selectByReceiptIdmockResolvedValue = Array(10).fill(mockResolvedValue)
        PrismaMock.purchase.findMany.mockResolvedValue(selectByReceiptIdmockResolvedValue);

        const result = await repository.selectByReceiptId(testValues.receiptId)

        expect(PrismaMock.purchase.findMany).toHaveBeenCalledWith({
            where: {
                receiptId: mockResolvedValue.receiptId
            }
        });
        expect(result).toEqual(
            selectByReceiptIdmockResolvedValue.map((purchase) => new PurchaseEntity({
                    userId: new Id(purchase.userId),
                    receiptId: new Id(purchase.receiptId),
                    storeId: new Id(purchase.storeId),
                    productId: new Id(purchase.productId),
                    quantity: new PurchaseQuantity(purchase.quantity),
                    price: new PurchasePrice(purchase.price)
                }, new Id(purchase.id), new CreatedAt(purchase.createdAt))
            )
        )
    })

    it('deleteByIdが正常に呼び出されること', async () => {
        await repository.deleteById(testId)

        expect(PrismaMock.purchase.delete).toHaveBeenCalledWith({
            where: {
                id: testId.value
            }
        })
    })
})