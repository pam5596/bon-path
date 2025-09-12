import BaseRepository from "./_abstruct";
import queryHandler from "./_queryHandler";
import { Id, CreatedAt, PurchasePrice, PurchaseQuantity } from "@models/valueObject";
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
            const { id, ...values } = find_result;
            return new PurchaseEntity({
                userId: new Id(values.userId),
                receiptId: new Id(values.receiptId),
                storeId: new Id(values.storeId),
                productId: new Id(values.productId),
                quantity: new PurchaseQuantity(values.quantity),
                price: new PurchasePrice(values.price)
            }, new Id(id), new CreatedAt(values.createdAt))
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

        return find_result.map((purchase) => new PurchaseEntity({
            userId: new Id(purchase.userId),
            receiptId: new Id(purchase.receiptId),
            storeId: new Id(purchase.storeId),
            productId: new Id(purchase.productId),
            quantity: new PurchaseQuantity(purchase.quantity),
            price: new PurchasePrice(purchase.price)
        }, new Id(purchase.id), new CreatedAt(purchase.createdAt)))
    }

    @queryHandler
    async selectByReceiptId(receiptId: Id) {
        const find_result = await this.client.purchase.findMany({
            where: {
                receiptId: receiptId.value
            }
        });

        return find_result.map((purchase) => new PurchaseEntity({
            userId: new Id(purchase.userId),
            receiptId: new Id(purchase.receiptId),
            storeId: new Id(purchase.storeId),
            productId: new Id(purchase.productId),
            quantity: new PurchaseQuantity(purchase.quantity),
            price: new PurchasePrice(purchase.price)
        }, new Id(purchase.id), new CreatedAt(purchase.createdAt)))
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