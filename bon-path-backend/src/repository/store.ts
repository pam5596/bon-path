import BaseRepository from "./_abstruct";
import queryHandler from "./_queryHandler";
import { Id, CreatedAt, StoreLatitude, StoreLongitude } from "@models/valueObject";
import { StoreEntity } from "@models/entity";
import { Prisma } from "../clients/prisma";

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
    async selectAll(filter?: { 
        location?: { 
            latitude: StoreLatitude, 
            longitude: StoreLongitude,
            radius: number
        }, 
        limit?: number 
    }) {
        if (filter?.location) {
            const find_results = await this.client.$queryRawUnsafe(`
                SELECT *, ST_DistanceSphere(
                    ST_MakePoint(longitude, latitude),
                    ST_MakePoint(
                        ${filter.location.longitude.value},
                        ${filter.location.latitude.value}
                    )
                ) AS distance
                FROM "Store"
                WHERE ST_DistanceSphere(
                    ST_MakePoint(longitude, latitude),
                    ST_MakePoint(
                        ${filter.location.longitude.value},
                        ${filter.location.latitude.value}
                    )
                ) <= ${filter.location.radius}
                ORDER BY distance ASC
                ${ filter.limit ? `LIMIT ${filter.limit}` : '' };
            `) as (Prisma.StoreGetPayload<{}> & { distance: number })[]
            return find_results.map((store) => {
                const { distance, ...values } = store
                return StoreEntity.fromPrimitives(values)
            });
        } else {
            const find_results = await this.client.store.findMany({ take: filter?.limit });
            return find_results.map((store) => StoreEntity.fromPrimitives(store));
        }
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
    async selectByIds(ids: Id[]) {
        const find_result = await this.client.store.findMany({
            where: {
                id: { 
                    in: ids.map(id => id.value)
                }
            }
        })
        return find_result.map((store) => StoreEntity.fromPrimitives(store));
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