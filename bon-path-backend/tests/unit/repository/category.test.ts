import { describe, expect, it } from "vitest";
import { Id, CategoryName } from "@models/valueObject";
import { CategoryEntity } from "@models/entity";
import { CategoryRepository } from "@repository";
import { PrismaMock } from "./_prisma";

describe('CategoryRepositoryのMockテスト', () => {
    const mockResolvedValue = {
        name: "食料品",
        parentId: 2,
        id: 1
    }

    const testId = new Id(mockResolvedValue.id)
    const testValues = {
        parentId: new Id(mockResolvedValue.parentId),
        name: new CategoryName(mockResolvedValue.name)
    }

    const repository = new CategoryRepository(PrismaMock as any);

    it('insertが正常に呼び出されること', async () => {
        PrismaMock.category.create.mockResolvedValue(mockResolvedValue);

        const entity = new CategoryEntity(testValues);
        const result = await repository.insert(entity);
        
        const { id, ...calledData } = mockResolvedValue;
        expect(PrismaMock.category.create).toHaveBeenCalledWith({
            data: calledData
        });
        expect(result).toEqual(new CategoryEntity(testValues, testId));
    });

    it('selectByIdがnullでないときでも正常に呼び出されること', async () => {
        PrismaMock.category.findUnique.mockResolvedValue(mockResolvedValue);

        const result = await repository.selectById(testId);

        expect(PrismaMock.category.findUnique).toHaveBeenCalledWith({
            where: {
                id: mockResolvedValue.id
            },
        });
        expect(result).toEqual(new CategoryEntity(testValues, testId));
    });

    it('selectByIdがnullでも正常に呼び出されること', async () => {
        PrismaMock.category.findUnique.mockResolvedValue(null);

        const result = await repository.selectById(testId)

        expect(PrismaMock.category.findUnique).toHaveBeenCalledWith({
            where: {
                id: mockResolvedValue.id
            },
        });
        expect(result).toEqual(null);
    })
})