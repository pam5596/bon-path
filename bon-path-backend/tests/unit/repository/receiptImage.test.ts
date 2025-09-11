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
        url: "https://vitest.dev/image"
    }

    const testId = new Id(mockResolvedValue.id)
    const testCreatedAt = new CreatedAt(mockResolvedValue.createdAt)
    const testValues = {
        receiptId: new Id(mockResolvedValue.receiptId),
        url: new ReceiptImageUrl(mockResolvedValue.url)
    }

    const repository = new ReceiptImageRepository(PrismaMock as any);

    it('insertが正常に呼び出されること', async () => {
        PrismaMock.receiptImage.create.mockResolvedValue(mockResolvedValue);

        const entity = new ReceiptImageEntity(testValues);
        const result = await repository.insert(entity);
        
        const { id, createdAt, ...calledData } = mockResolvedValue;
        expect(PrismaMock.receiptImage.create).toHaveBeenCalledWith({
            data: calledData
        });
        expect(result).toEqual(new ReceiptImageEntity(testValues, testId, testCreatedAt));
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
            selectByReceiptIdmockResolvedValue.map((receiptImage) => new ReceiptImageEntity({
                receiptId: new Id(receiptImage.receiptId),
                url: new ReceiptImageUrl(receiptImage.url)
            }, new Id(receiptImage.id), new CreatedAt(receiptImage.createdAt)))
        )
    });

    it('deleteByIdが正常に呼び出されること', async () => {
        await repository.deleteById(testId)

        expect(PrismaMock.receiptImage.delete).toHaveBeenCalledWith({
            where: {
                id: testId.value
            }
        })
    })
})