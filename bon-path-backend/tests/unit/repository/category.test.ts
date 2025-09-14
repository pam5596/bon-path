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

    const testValues = {
        id: new Id(mockResolvedValue.id),
        parentId: new Id(mockResolvedValue.parentId),
        name: new CategoryName(mockResolvedValue.name)
    }

    const repository = new CategoryRepository(PrismaMock as any);

    it('insertが正常に呼び出されること', async () => {
        PrismaMock.category.create.mockResolvedValue(mockResolvedValue);

        const { id: _id, ...values } = testValues;
        const entity = new CategoryEntity(values);
        const result = await repository.insert(entity);
        
        const { id: __id, ...calledData } = mockResolvedValue;
        expect(PrismaMock.category.create).toHaveBeenCalledWith({
            data: calledData
        });
        expect(result).toEqual(new CategoryEntity(testValues));
    });

    it('selectByIdがnullでないときでも正常に呼び出されること', async () => {
        PrismaMock.category.findUnique.mockResolvedValue(mockResolvedValue);

        const result = await repository.selectById(testValues.id);

        expect(PrismaMock.category.findUnique).toHaveBeenCalledWith({
            where: {
                id: mockResolvedValue.id
            },
        });
        expect(result).toEqual(new CategoryEntity(testValues));
    });

    it('selectByIdがnullでも正常に呼び出されること', async () => {
        PrismaMock.category.findUnique.mockResolvedValue(null);

        const result = await repository.selectById(testValues.id)

        expect(PrismaMock.category.findUnique).toHaveBeenCalledWith({
            where: {
                id: mockResolvedValue.id
            },
        });
        expect(result).toEqual(null);
    })
})