import { PrismaVectorClient } from "@client";
import queryHandler from "./_queryHandler";
import { Id, StoreName } from "@models/valueObject";
import { StoreEntity } from "@models/entity";

export default class StoreVectorRepository {
    constructor(
        protected client: PrismaVectorClient
    ){}

    @queryHandler
    async insertMany(contents: StoreEntity[]) {
        await this.client.store.addModels(
            await this.client.prisma.$transaction(
                contents.map(
                    (content) => this.client.prisma.storeVector.create({ 
                        data: {
                            storeId: content.id!.value,
                            content: content.getValues.name.value
                        }
                    }
                ))
            )
        )
    }

    @queryHandler
    async searchStoreIdByName(name: StoreName, limit: number = 10) {
        const search_results =  await this.client.store.similaritySearch(
            name.value,
            limit
        );

        const find_result = await this.client.prisma.storeVector.findMany({
            where: { 
                id: {
                    in: search_results.map(document => document.metadata.id as number)
                }
            }
        })

        return find_result.map((vector) => new Id(vector.storeId))
    }
}