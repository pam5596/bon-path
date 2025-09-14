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

    const testValues = {
        id: new Id(mockResolvedValue.id),
        createdAt: new CreatedAt(mockResolvedValue.createdAt),
        userId: new Id(mockResolvedValue.userId),
        isChecked: new ReceiptIsChecked(mockResolvedValue.isChecked),
        latitude: new ReceiptLatitude(mockResolvedValue.latitude),
        longitude: new ReceiptLongitude(mockResolvedValue.longitude)
    }

    const repository = new ReceiptRepository(PrismaMock as any)

    it('insertが正常に呼び出されること', async () => {
        PrismaMock.receipt.create.mockResolvedValue(mockResolvedValue);

        const { id: _id, createdAt: _ca, ...values } = testValues;
        const entity = new ReceiptEntity(values);
        const result = await repository.insert(entity);
        
        const { id: __id, createdAt: __ca, ...calledData } = mockResolvedValue;
        expect(PrismaMock.receipt.create).toHaveBeenCalledWith({
            data: calledData
        });
        expect(result).toEqual(new ReceiptEntity(testValues));
    });

    it('selectByIdがnullでないときでも正常に呼び出されること', async () => {
        PrismaMock.receipt.findUnique.mockResolvedValue(mockResolvedValue);

        const result = await repository.selectById(testValues.id);

        expect(PrismaMock.receipt.findUnique).toHaveBeenCalledWith({
            where: {
                id: mockResolvedValue.id
            },
        });
        expect(result).toEqual(new ReceiptEntity(testValues));
    });

    it('selectByIdがnullでも正常に呼び出されること', async () => {
        PrismaMock.receipt.findUnique.mockResolvedValue(null);

        const result = await repository.selectById(testValues.id)

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
            selectByUserIdmockResolvedValue.map((receipt) => ReceiptEntity.fromPrimitives(receipt))
        )
    })

    it('updateが正常に呼び出されること', async () => {
        const entity = new ReceiptEntity(testValues)
        await repository.update(entity);

        expect(PrismaMock.receipt.update).toHaveBeenCalledWith({
            where: {
                id: entity.id!.value
            },
            data: entity.toPrimitives
        });
    })

    it('deleteByIdが正常に呼び出されること', async () => {
        await repository.deleteById(testValues.id)

        expect(PrismaMock.receipt.delete).toHaveBeenCalledWith({
            where: {
                id: testValues.id.value
            }
        })
    })
})