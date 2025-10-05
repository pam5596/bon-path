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
        
        return await Promise.all(
            search_results.map(
                async (document) => {
                    const find_result = await this.client.prisma.storeVector.findUnique({
                        where: { id: document.metadata.id as number }
                    })

                    return find_result?.storeId ? new Id(find_result.storeId) : null;
                }
            )
        );
    }
}