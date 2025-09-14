import BaseRepository from "./_abstruct";
import queryHandler from "./_queryHandler";
import { Id, CreatedAt } from "@models/valueObject";
import { ReceiptImageEntity } from "@models/entity";

export default class ReceiptImageRepository extends BaseRepository {
    @queryHandler
    async insert(receiptImage: ReceiptImageEntity) {
        const create_result = await this.client.receiptImage.create({
            data: receiptImage.toPrimitives
        });
        receiptImage.newId = new Id(create_result.id);
        receiptImage.created = new CreatedAt(create_result.createdAt);

        return receiptImage;
    }

    @queryHandler
    async selectByReceiptId(receiptId: Id) {
        const find_result = await this.client.receiptImage.findMany({
            where: {
                receiptId: receiptId.value
            }
        });

        return find_result.map((receiptImage) => ReceiptImageEntity.fromPrimitives(receiptImage))
    }

    @queryHandler
    async deleteById(id: Id) {
        await this.client.receiptImage.delete({
            where: {
                id: id.value
            }
        })
    }
}