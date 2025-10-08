import { describe, expect, it } from "vitest";
import { CreatedAt, Id, ReceiptImageUrl } from "@models/valueObject";
import { ReceiptImageEntity } from "@models/entity";
import { ReceiptImageRepository } from "@repository";
import { PrismaMock } from "./_prisma";

describe('ReceiptImageRepositoryのMockテスト', () => {
    const mockResolvedValue = {
        createdAt: new Date('2025-09-11'),
        id: 1,
        receiptId: 2,
        url: "/vitest.dev/image"
    }

    const testValues = {
        id: new Id(mockResolvedValue.id),
        createdAt: new CreatedAt(mockResolvedValue.createdAt),
        receiptId: new Id(mockResolvedValue.receiptId),
        url: new ReceiptImageUrl(mockResolvedValue.url)
    }

    const repository = new ReceiptImageRepository(PrismaMock as any);

    it('insertManyが正常に呼び出されること', async () => {
        const insertManymockResolvedValue = Array(10).fill(mockResolvedValue)
        PrismaMock.receiptImage.createManyAndReturn.mockResolvedValue(insertManymockResolvedValue);

        const { id: _id, createdAt: _ca, ...values } = testValues;
        const entity = new ReceiptImageEntity(values);
        const result = await repository.insertMany(Array(10).fill(entity));
        
        const { id: __id, createdAt: __ca, ...calledData } = mockResolvedValue;
        expect(PrismaMock.receiptImage.createManyAndReturn).toHaveBeenCalledWith({
            data: Array(10).fill(calledData)
        });
        expect(result).toEqual(Array(10).fill(new ReceiptImageEntity(testValues)));
    });

    it('selectByReceiptId正常に呼び出されること', async () => {
        const selectByReceiptIdmockResolvedValue = Array(10).fill(mockResolvedValue)
        PrismaMock.receiptImage.findMany.mockResolvedValue(selectByReceiptIdmockResolvedValue);

        const result = await repository.selectByReceiptId(testValues.receiptId)

        expect(PrismaMock.receiptImage.findMany).toHaveBeenCalledWith({
            where: {
                receiptId: mockResolvedValue.receiptId
            }
        });
        expect(result).toEqual(
            selectByReceiptIdmockResolvedValue.map((receiptImage) => ReceiptImageEntity.fromPrimitives(receiptImage))
        )
    });

    it('deleteByIdが正常に呼び出されること', async () => {
        await repository.deleteById(testValues.id)

        expect(PrismaMock.receiptImage.delete).toHaveBeenCalledWith({
            where: {
                id: testValues.id.value
            }
        })
    })
})