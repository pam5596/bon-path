import BaseRepository from "./_abstruct";
import queryHandler from "./_queryHandler";
import { Id, CreatedAt, ReceiptIsChecked, ReceiptLatitude, ReceiptLongitude } from "@models/valueObject";
import { ReceiptEntity } from "@models/entity";

export default class ReceiptRepository extends BaseRepository {
    @queryHandler
    async insert(receipt: ReceiptEntity) {
        const create_result = await this.client.receipt.create({
            data: receipt.toPrimitives
        })
        receipt.newId = new Id(create_result.id);
        receipt.created = new CreatedAt(create_result.createdAt);

        return receipt;
    }

    @queryHandler
    async selectById(id: Id) {
        const find_result = await this.client.receipt.findUnique({
            where: {
                id: id.value,
            },
        });

        if (find_result) {
            const { id, ...values } = find_result;
            return new ReceiptEntity({
                userId: new Id(values.userId),
                isChecked: new ReceiptIsChecked(values.isChecked),
                latitude: new ReceiptLatitude(values.latitude),
                longitude: new ReceiptLongitude(values.longitude)
            }, new Id(id), new CreatedAt(values.createdAt));
        } else {
            return find_result;
        }
    }

    @queryHandler
    async selectByUserId(userId: Id) {
        const find_result = await this.client.receipt.findMany({
            where: {
                userId: userId.value
            }
        });

        return find_result.map((receipt) => new ReceiptEntity({
            userId: new Id(receipt.userId),
            isChecked: new ReceiptIsChecked(receipt.isChecked),
            latitude: new ReceiptLatitude(receipt.latitude),
            longitude: new ReceiptLongitude(receipt.longitude)
        }, new Id(receipt.id), new CreatedAt(receipt.createdAt)))
    }

    @queryHandler
    async update(receipt: ReceiptEntity) {
        await this.client.receipt.update({
            where: {
                id: receipt.id!.value
            },
            data: receipt.toPrimitives
        })
    }

    @queryHandler
    async deleteById(id: Id) {
        await this.client.receipt.delete({
            where: {
                id: id.value
            }
        })
    }
}