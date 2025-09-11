import { describe, expect, it } from "vitest";
import { CreatedAt, Id, ReceiptIsChecked, ReceiptLatitude, ReceiptLongitude } from "@models/valueObject";
import { ReceiptEntity } from "@models/entity";
import { ReceiptRepository } from "@repository";
import { PrismaMock } from "./_prisma";

describe('ReceiptRepositoryのMockテスト', () => {
    const mockResolvedValue = {
        createdAt: new Date('2025-09-11'),
        id: 1,
        userId: 2,
        isChecked: false,
        latitude: 90.0000,
        longitude: 90.0000
    }

    const testId = new Id(mockResolvedValue.id)
    const testCreatedAt = new CreatedAt(mockResolvedValue.createdAt)
    const testValues = {
        userId: new Id(mockResolvedValue.userId),
        isChecked: new ReceiptIsChecked(mockResolvedValue.isChecked),
        latitude: new ReceiptLatitude(mockResolvedValue.latitude),
        longitude: new ReceiptLongitude(mockResolvedValue.longitude)
    }

    const repository = new ReceiptRepository(PrismaMock as any)

    it('insertが正常に呼び出されること', async () => {
        PrismaMock.receipt.create.mockResolvedValue(mockResolvedValue);

        const entity = new ReceiptEntity(testValues);
        const result = await repository.insert(entity);
        
        const { id, createdAt, ...calledData } = mockResolvedValue;
        expect(PrismaMock.receipt.create).toHaveBeenCalledWith({
            data: calledData
        });
        expect(result).toEqual(new ReceiptEntity(testValues, testId, testCreatedAt));
    });

    it('selectByIdがnullでないときでも正常に呼び出されること', async () => {
        PrismaMock.receipt.findUnique.mockResolvedValue(mockResolvedValue);

        const result = await repository.selectById(testId);

        expect(PrismaMock.receipt.findUnique).toHaveBeenCalledWith({
            where: {
                id: mockResolvedValue.id
            },
        });
        expect(result).toEqual(new ReceiptEntity(testValues, testId, testCreatedAt));
    });

    it('selectByIdがnullでも正常に呼び出されること', async () => {
        PrismaMock.receipt.findUnique.mockResolvedValue(null);

        const result = await repository.selectById(testId)

        expect(PrismaMock.receipt.findUnique).toHaveBeenCalledWith({
            where: {
                id: mockResolvedValue.id
            },
        });
        expect(result).toEqual(null);
    })

    it('selectByUserIdが正常に呼び出されること', async () => {
        const selectByUserIdmockResolvedValue = Array(10).fill(mockResolvedValue)
        PrismaMock.receipt.findMany.mockResolvedValue(selectByUserIdmockResolvedValue);

        const result = await repository.selectByUserId(testValues.userId)

        expect(PrismaMock.receipt.findMany).toHaveBeenCalledWith({
            where: {
                userId: mockResolvedValue.userId
            }
        });
        expect(result).toEqual(
            selectByUserIdmockResolvedValue.map((receipt) => new ReceiptEntity({
                userId: new Id(receipt.userId),
                isChecked: new ReceiptIsChecked(receipt.isChecked),
                latitude: new ReceiptLatitude(receipt.latitude),
                longitude: new ReceiptLongitude(receipt.longitude)
            }, new Id(receipt.id), new CreatedAt(receipt.createdAt)))
        )
    })

    it('updateが正常に呼び出されること', async () => {
        const entity = new ReceiptEntity(testValues, testId)
        await repository.update(entity);

        expect(PrismaMock.receipt.update).toHaveBeenCalledWith({
            where: {
                id: entity.id!.value
            },
            data: entity.getRowValues
        });
    })

    it('deleteByIdが正常に呼び出されること', async () => {
        await repository.deleteById(testId)

        expect(PrismaMock.receipt.delete).toHaveBeenCalledWith({
            where: {
                id: testId.value
            }
        })
    })
})