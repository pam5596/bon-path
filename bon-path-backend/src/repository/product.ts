import BaseRepository from "./_abstruct";
import queryHandler from "./_queryHandler";
import { Id } from "@models/valueObject";
import { ProductEntity } from "@models/entity";

export default class ProductRepository extends BaseRepository {
    @queryHandler
    async insertMany(products: ProductEntity[]) {
        const create_result = await this.client.product.createManyAndReturn({
            data: products.map((product) => product.toPrimitives)
        })

        return create_result.map((product) => ProductEntity.fromPrimitives(product))
    }

    @queryHandler
    async selectById(id: Id) {
        const find_result = await this.client.product.findUnique({
            where: {
                id: id.value,
            },
        });

        if (find_result) {
            return ProductEntity.fromPrimitives(find_result)
        } else {
            return find_result;
        }
    }

    @queryHandler
    async selectByStoreId(storeId: Id) {
        const find_result = await this.client.product.findMany({
            where: {
                storeId: storeId.value
            }
        });

        return find_result.map((product) => ProductEntity.fromPrimitives(product))
    }

    @queryHandler
    async selectByCategoryId(categoryId: Id) {
        const find_result = await this.client.product.findMany({
            where: {
                categoryId: categoryId.value
            }
        });

        return find_result.map((product) => ProductEntity.fromPrimitives(product))
    }

    @queryHandler
    async update(product: ProductEntity) {
        await this.client.product.update({
            where: {
                id: product.id!.value
            },
            data: product.toPrimitives
        })
    }

    @queryHandler
    async deleteById(id: Id) {
        await this.client.product.delete({
            where: {
                id: id.value
            }
        })
    }
}