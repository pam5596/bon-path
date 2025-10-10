import { PrismaVectorClient } from "@client";
import queryHandler from "./_queryHandler";
import { Id, ProductName } from "@models/valueObject";
import { ProductEntity } from "@models/entity";

export default class ProductVectorRepository {
    constructor(
        protected client: PrismaVectorClient
    ){}

    @queryHandler
    async insertMany(contents: ProductEntity[]) {
        await this.client.product.addModels(
            await this.client.prisma.$transaction(
                contents.map(
                    (content) => this.client.prisma.productVector.create({ 
                        data: {
                            productId: content.id!.value,
                            content: content.getValues.name.value
                        }
                    }
                ))
            )
        )
    }

    @queryHandler
    async searchProductIdByName(name: ProductName, limit: number = 10) {
        const search_results =  await this.client.product.similaritySearch(
            name.value,
            limit
        );

        const find_result = await this.client.prisma.productVector.findMany({
            where: { 
                id: {
                    in: search_results.map(document => document.metadata.id as number)
                }
            }
        })

        return find_result.map((vector) => new Id(vector.productId))
    }
}