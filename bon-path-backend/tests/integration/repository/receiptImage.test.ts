import { describe, expect, it } from "vitest";
import { withTestTruncate } from "./_withTestTruncate";
import { PrismaClient } from "@client";
import { Id, UserEmail, UserHashPassword, UserName, ReceiptIsChecked, ReceiptLatitude, ReceiptLongitude, ReceiptImageUrl} from "@models/valueObject";
import { UserEntity, ReceiptEntity, ReceiptImageEntity } from "@models/entity";
import { UserRepository, ReceiptRepository, ReceiptImageRepository } from "@repository";

describe('ReceiptImageRepositoryの結合テスト', () => {
    const client = new PrismaClient()
    withTestTruncate(client, ['User', 'Receipt', 'ReceiptImage'])

    const primitives = {
        url: "/bonpath/a.jpg"
    }

    const valueObjects = {
        url: new ReceiptImageUrl(primitives.url)
    }

    const repository = new ReceiptImageRepository(client);
    const receipt_repository = new ReceiptRepository(client);
    const user_repository = new UserRepository(client);

    const foreignDataInserts = async () => {
        const user_entity = await user_repository.insert(
            new UserEntity({
                name: new UserName('ボンパス太郎'),
                password: new UserHashPassword('$argon2id$v=19$m=65536,t=3,p=4$FZej+Jwsm6aZfX9+Wf3p6A$7y0SxIB7U4HQfMF5g53s6XHLr6vErvP5PrdP8R+L0rc'),
                email: new UserEmail('bonpath@example.com')
            })
        )
        return await receipt_repository.insert(
            new ReceiptEntity({
                userId: user_entity.id!,
                isChecked: new ReceiptIsChecked(false),
                latitude: new ReceiptLatitude(45.0000),
                longitude: new ReceiptLongitude(45.0000)
            })
        )
    }

    it('insertManyメソッドが複数のレシート画像を追加できること', async () => {
        const receipt_entity = await foreignDataInserts();
        const entity = new ReceiptImageEntity({
            ...valueObjects,
            receiptId: receipt_entity.id!
        })
        await repository.insert(entity);

        const count = await client.receiptImage.count();
        expect(count).toBe(1)
    });

    it('selectByReceiptIdが指定したレシートIDの画像を返す', async () => {
        const receipt_entity = await foreignDataInserts();
        const entity = new ReceiptImageEntity({
            ...valueObjects,
            receiptId: receipt_entity.id!
        })
        await repository.insert(entity);
        
        const selectable_result = await repository.selectByReceiptId(receipt_entity.id!)
        
        expect(selectable_result.length).toBe(1)

        const null_result = await repository.selectByReceiptId(new Id(999));
        expect(null_result).toEqual([])
    });

    it('deleteByIdがレシート画像を削除すること', async () => {
        const receipt_entity = await foreignDataInserts();
        const entity = new ReceiptImageEntity({
            ...valueObjects,
            receiptId: receipt_entity.id!
        })
        const insert_result = await repository.insert(entity);

        const before_count = await client.receiptImage.count()
        expect(before_count).toBe(1)

        await repository.deleteById(insert_result.id!);

        const after_count = await client.receiptImage.count()
        expect(after_count).toBe(0)
    })
})