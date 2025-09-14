import BaseRepository from "./_abstruct";
import queryHandler from "./_queryHandler";
import { Id, CreatedAt } from "@models/valueObject";
import { PurchaseEntity } from "@models/entity";

export default class PurchaseRepository extends BaseRepository {
    @queryHandler
    async insert(purchase: PurchaseEntity) {
        const create_result = await this.client.purchase.create({
            data: purchase.toPrimitives
        })
        purchase.newId = new Id(create_result.id)
        purchase.created = new CreatedAt(create_result.createdAt)

        return purchase;
    }

    @queryHandler
    async selectById(id: Id) {
        const find_result = await this.client.purchase.findUnique({
            where: {
                id: id.value
            }
        });

        if (find_result) {
            return PurchaseEntity.fromPrimitives(find_result);
        } else {
            return find_result;
        }
    }

    @queryHandler
    async selectByUserId(userId: Id) {
        const find_result = await this.client.purchase.findMany({
            where: {
                userId: userId.value
            }
        });

        return find_result.map((purchase) => PurchaseEntity.fromPrimitives(purchase))
    }

    @queryHandler
    async selectByReceiptId(receiptId: Id) {
        const find_result = await this.client.purchase.findMany({
            where: {
                receiptId: receiptId.value
            }
        });

        return find_result.map((purchase) => PurchaseEntity.fromPrimitives(purchase))
    }

    @queryHandler
    async deleteById(id: Id) {
        await this.client.purchase.delete({
            where: {
                id: id.value
            }
        })
    }
}