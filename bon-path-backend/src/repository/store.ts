import BaseRepository from "./_abstruct";
import queryHandler from "./_queryHandler";
import { Id, CreatedAt } from "@models/valueObject";
import { StoreEntity } from "@models/entity";

export default class StoreRepository extends BaseRepository {
    @queryHandler
    async insert(store: StoreEntity) {
        const create_result = await this.client.store.create({
            data: store.toPrimitives
        })
        store.newId = new Id(create_result.id);
        store.created = new CreatedAt(create_result.createdAt);

        return store;
    }

    @queryHandler
    async selectAll() {
        const find_result = await this.client.store.findMany();

        return find_result.map((store) => StoreEntity.fromPrimitives(store));
    }

    @queryHandler
    async selectById(id: Id) {
        const find_result = await this.client.store.findUnique({
            where: {
                id: id.value,
            },
        });

        if (find_result) {
            return StoreEntity.fromPrimitives(find_result)
        } else {
            return find_result;
        }
    }

    @queryHandler
    async update(store: StoreEntity) {
        await this.client.store.update({
            where: {
                id: store.id!.value
            },
            data: store.toPrimitives
        })
    }

    @queryHandler
    async deleteById(id: Id) {
        await this.client.store.delete({
            where: {
                id: id.value
            }
        })
    }
}