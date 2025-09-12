import BaseRepository from "./_abstruct";
import queryHandler from "./_queryHandler";
import nullableMapper from "./_nullableMapper";
import { Id, CreatedAt, StoreGoogleMapLink, StoreImage, StoreLatitude, StoreLongitude, StoreName } from "@models/valueObject";
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

        return find_result.map((store) => new StoreEntity({
            name: new StoreName(store.name),
            image: nullableMapper(store.image, (v) => new StoreImage(v)),
            latitude: nullableMapper(store.latitude, (v) => new StoreLatitude(v)),
            longitude: nullableMapper(store.longitude, (v) => new StoreLongitude(v)),
            googleMapLink: nullableMapper(store.googleMapLink, (v) => new StoreGoogleMapLink(v))
        }, new Id(store.id), new CreatedAt(store.createdAt)));
    }

    @queryHandler
    async selectById(id: Id) {
        const find_result = await this.client.store.findUnique({
            where: {
                id: id.value,
            },
        });

        if (find_result) {
            const { id, ...values } = find_result;
            return new StoreEntity({
                name: new StoreName(values.name),
                image: nullableMapper(values.image, (v) => new StoreImage(v)),
                latitude: nullableMapper(values.latitude, (v) => new StoreLatitude(v)),
                longitude: nullableMapper(values.longitude, (v) => new StoreLongitude(v)),
                googleMapLink: nullableMapper(values.googleMapLink, (v) => new StoreGoogleMapLink(v))
            }, new Id(id), new CreatedAt(values.createdAt));
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