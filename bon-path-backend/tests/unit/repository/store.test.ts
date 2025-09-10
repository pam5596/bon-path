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

    const testId = new Id(mockResolvedValue.id)
    const testCreatedAt = new CreatedAt(mockResolvedValue.createdAt)
    const testValues = {
        googleMapLink: new StoreGoogleMapLink(mockResolvedValue.googleMapLink),
        image: new StoreImage(mockResolvedValue.image),
        name: new StoreName(mockResolvedValue.name),
        latitude: new StoreLatitude(mockResolvedValue.latitude),
        longitude: new StoreLongitude(mockResolvedValue.longitude)
    }

    const repository = new StoreRepository(PrismaMock as any);

    it('insertが正常に呼び出されること', async () => {
        PrismaMock.store.create.mockResolvedValue(mockResolvedValue);

        const entity = new StoreEntity(testValues);
        const result = await repository.insert(entity);
        
        const { id, createdAt, ...calledData } = mockResolvedValue;
        expect(PrismaMock.store.create).toHaveBeenCalledWith({
            data: calledData
        });
        expect(result).toEqual(new StoreEntity(testValues, testId, testCreatedAt));
    });

    it('selectAllが正常に呼び出されること', async () => {
        const selectAllMockResolvedValue = Array(10).fill(mockResolvedValue)
        PrismaMock.store.findMany.mockResolvedValue(selectAllMockResolvedValue);

        const result = await repository.selectAll();

        expect(PrismaMock.store.findMany).toHaveBeenCalledWith();
        expect(result).toEqual(
            selectAllMockResolvedValue.map((s) => new StoreEntity({
                name: new StoreName(s.name),
                image: new StoreImage(s.image),
                latitude: new StoreLatitude(s.latitude),
                longitude: new StoreLongitude(s.longitude),
                googleMapLink: new StoreGoogleMapLink(s.googleMapLink)
            }, new Id(s.id), new CreatedAt(s.createdAt)))
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

        const result = await repository.selectById(testId);

        expect(PrismaMock.store.findUnique).toHaveBeenCalledWith({
            where: {
                id: mockResolvedValue.id
            },
        });
        expect(result).toEqual(new StoreEntity(testValues, testId, testCreatedAt));
    });

    it('selectByIdがnullでも正常に呼び出されること', async () => {
        PrismaMock.store.findUnique.mockResolvedValue(null);

        const result = await repository.selectById(testId)

        expect(PrismaMock.store.findUnique).toHaveBeenCalledWith({
            where: {
                id: mockResolvedValue.id
            },
        });
        expect(result).toEqual(null);
    })

    it('updateが正常に呼び出されること', async () => {
        const entity = new StoreEntity(testValues, testId)
        await repository.update(entity);

        expect(PrismaMock.store.update).toHaveBeenCalledWith({
            where: {
                id: entity.id!.value
            },
            data: entity.getRowValues
        });
    })

    it('deleteByIdが正常に呼び出されること', async () => {
        await repository.deleteById(testId)

        expect(PrismaMock.store.delete).toHaveBeenCalledWith({
            where: {
                id: testId.value
            }
        })
    })
})