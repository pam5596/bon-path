import { PrismaVectorClient } from "@client";
import queryHandler from "./_queryHandler";
import { ProductName } from "@models/valueObject";
import { ProductEntity } from "@models/entity";

export default class ProductRepository {
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
    async searchByName(name: ProductName, limit: number = 10) {
        return await this.client.product.similaritySearch(
            name.value,
            limit
        )
    }
}