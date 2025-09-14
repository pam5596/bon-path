import { describe, expect, it } from "vitest";
import { CreatedAt, Id, StoreGoogleMapLink, StoreImage, StoreLatitude, StoreLongitude, StoreName } from "@models/valueObject";
import { StoreEntity } from "@models/entity";
import { StoreRepository } from "@repository";
import { PrismaMock } from "./_prisma";

describe('StoreRepositoryのMockテスト', () => {
    const mockResolvedValue = {
        googleMapLink: "https://vitest.dev/link",
        image: "https://vitest.dev/image",
        name: "あううぃああ店",
        latitude: 90.0000,
        longitude: 90.0000,
        createdAt: new Date('2025-09-10'),
        id: 1
    }

    const testValues = {
        id: new Id(mockResolvedValue.id),
        createdAt: new CreatedAt(mockResolvedValue.createdAt),
        googleMapLink: new StoreGoogleMapLink(mockResolvedValue.googleMapLink),
        image: new StoreImage(mockResolvedValue.image),
        name: new StoreName(mockResolvedValue.name),
        latitude: new StoreLatitude(mockResolvedValue.latitude),
        longitude: new StoreLongitude(mockResolvedValue.longitude)
    }

    const repository = new StoreRepository(PrismaMock as any);

    it('insertが正常に呼び出されること', async () => {
        PrismaMock.store.create.mockResolvedValue(mockResolvedValue);

        const { id: _id, createdAt: _ca, ...values } = testValues;
        const entity = new StoreEntity(values);
        const result = await repository.insert(entity);
        
        const { id: __id, createdAt: __ca, ...calledData } = mockResolvedValue;
        expect(PrismaMock.store.create).toHaveBeenCalledWith({
            data: calledData
        });
        expect(result).toEqual(new StoreEntity(testValues));
    });

    it('selectAllが正常に呼び出されること', async () => {
        const selectAllMockResolvedValue = Array(10).fill(mockResolvedValue)
        PrismaMock.store.findMany.mockResolvedValue(selectAllMockResolvedValue);

        const result = await repository.selectAll();

        expect(PrismaMock.store.findMany).toHaveBeenCalledWith();
        expect(result).toEqual(
            selectAllMockResolvedValue.map((s) => StoreEntity.fromPrimitives(s))
        )
    })

    it('selectAllが空でも正常に呼び出されること', async () => {
        PrismaMock.store.findMany.mockResolvedValue([]);

        const result = await repository.selectAll();

        expect(PrismaMock.store.findMany).toHaveBeenCalledWith();
        expect(result).toEqual([])
    })

    it('selectByIdがnullでないときでも正常に呼び出されること', async () => {
        PrismaMock.store.findUnique.mockResolvedValue(mockResolvedValue);

        const result = await repository.selectById(testValues.id);

        expect(PrismaMock.store.findUnique).toHaveBeenCalledWith({
            where: {
                id: mockResolvedValue.id
            },
        });
        expect(result).toEqual(new StoreEntity(testValues));
    });

    it('selectByIdがnullでも正常に呼び出されること', async () => {
        PrismaMock.store.findUnique.mockResolvedValue(null);

        const result = await repository.selectById(testValues.id)

        expect(PrismaMock.store.findUnique).toHaveBeenCalledWith({
            where: {
                id: mockResolvedValue.id
            },
        });
        expect(result).toEqual(null);
    })

    it('updateが正常に呼び出されること', async () => {
        const entity = new StoreEntity(testValues)
        await repository.update(entity);

        expect(PrismaMock.store.update).toHaveBeenCalledWith({
            where: {
                id: entity.id!.value
            },
            data: entity.toPrimitives
        });
    })

    it('deleteByIdが正常に呼び出されること', async () => {
        await repository.deleteById(testValues.id)

        expect(PrismaMock.store.delete).toHaveBeenCalledWith({
            where: {
                id: mockResolvedValue.id
            }
        })
    })
})