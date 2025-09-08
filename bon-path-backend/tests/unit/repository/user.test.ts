import { describe, expect, it } from "vitest";
import { CreatedAt, Id, UserEmail, UserHashId, UserHashPassword, UserName, UserPassword } from "@models/valueObject";
import { UserEntity } from "@models/entity";
import { UserRepository } from "@repository";
import { PrismaMock } from "./_prisma";

describe('UserRepositoryのMockテスト', () => {
    const mockResolvedValue = {
        hashedId: "cjr4j6g6g0000qzrmn0g1v6xv",
        name: "testuser",
        email: "test@example.com",
        password: "$argon2id$v=19$m=65536,t=3,p=4$FZej+Jwsm6aZfX9+Wf3p6A$7y0SxIB7U4HQfMF5g53s6XHLr6vErvP5PrdP8R+L0rc",
        createdAt: new Date('2025-08-29'),
        id: 1
    }

    const testId = new Id(mockResolvedValue.id)
    const testCreatedAt = new CreatedAt(mockResolvedValue.createdAt)
    const testValues = {
        hashedId: new UserHashId(mockResolvedValue.hashedId),
        name: new UserName(mockResolvedValue.name),
        email: new UserEmail(mockResolvedValue.email),
        password: new UserHashPassword(mockResolvedValue.password),
    }

    const repository = new UserRepository(PrismaMock as any);

    it('insertが正常に呼び出されること', async () => {
        PrismaMock.user.create.mockResolvedValue(mockResolvedValue);

        const { hashedId, ...values } = testValues;
        const entity = new UserEntity(values);
        const result = await repository.insert(entity);
        
        expect(PrismaMock.user.create).toHaveBeenCalledWith({
            data: {
                name: mockResolvedValue.name,
                email: mockResolvedValue.email,
                password: mockResolvedValue.password,
            }
        });
        expect(result).toEqual(new UserEntity(testValues, testId, testCreatedAt));
    });

    it('selectByIdがnullでないときでも正常に呼び出されること', async () => {
        PrismaMock.user.findUnique.mockResolvedValue(mockResolvedValue);

        const result = await repository.selectById(testId);

        expect(PrismaMock.user.findUnique).toHaveBeenCalledWith({
            where: {
                id: mockResolvedValue.id
            },
        });
        expect(result).toEqual(new UserEntity(testValues, testId, testCreatedAt));
    });

    it('selectByIdがnullでも正常に呼び出されること', async () => {
        PrismaMock.user.findUnique.mockResolvedValue(null);

        const result = await repository.selectById(testId)

        expect(PrismaMock.user.findUnique).toHaveBeenCalledWith({
            where: {
                id: mockResolvedValue.id
            },
        });
        expect(result).toEqual(null);
    })

    it('updateが正常に呼び出されること', async () => {
        const entity = new UserEntity(testValues, testId)
        await repository.update(entity);

        expect(PrismaMock.user.update).toHaveBeenCalledWith({
            where: {
                id: entity.id!.value
            },
            data: entity.getRowValues
        });
    })

    it('deleteByIdが正常に呼び出されること', async () => {
        await repository.deleteById(testId)

        expect(PrismaMock.user.delete).toHaveBeenCalledWith({
            where: {
                id: testId.value
            }
        })
    })
})