import BaseRepository from "./_abstruct";
import queryHandler from "./_queryHandler";
import { Id } from "@models/valueObject";
import { ReceiptImageEntity } from "@models/entity";

export default class ReceiptImageRepository extends BaseRepository {
    @queryHandler
    async insertMany(receiptImages: ReceiptImageEntity[]) {
        const create_result = await this.client.receiptImage.createManyAndReturn({
            data: receiptImages.map((receiptImage) => receiptImage.toPrimitives)
        });

        return create_result.map((receiptImage) => ReceiptImageEntity.fromPrimitives(receiptImage));
    }

    @queryHandler
    async selectById(id: Id) {
        const find_result = await this.client.receiptImage.findUnique({
            where: {
                id: id.value
            }
        });

        if (find_result) {
            return ReceiptImageEntity.fromPrimitives(find_result)
        } else {
            return find_result;
        }
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