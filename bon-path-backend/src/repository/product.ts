import BaseRepository from "./_abstruct";
import queryHandler from "./_queryHandler";
import nullableMapper from "./_nullableMapper";
import { Id, CreatedAt, ProductImage, ProductName, ProductPrice } from "@models/valueObject";
import { ProductEntity } from "@models/entity";

export default class ProductRepository extends BaseRepository {
    @queryHandler
    async insert(product: ProductEntity) {
        const create_result = await this.client.product.create({
            data: product.toPrimitives
        })
        product.newId = new Id(create_result.id);
        product.created = new CreatedAt(create_result.createdAt);

        return product;
    }

    @queryHandler
    async selectById(id: Id) {
        const find_result = await this.client.product.findUnique({
            where: {
                id: id.value,
            },
        });

        if (find_result) {
            const { id, ...values } = find_result;
            return new ProductEntity({
                storeId: new Id(values.storeId),
                categoryId: new Id(values.categoryId),
                name: new ProductName(values.name),
                image: nullableMapper(values.image, (v) => new ProductImage(v)),
                price: new ProductPrice(values.price)
            }, new Id(id), new CreatedAt(values.createdAt));
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

        return find_result.map((product) => new ProductEntity({
            storeId: new Id(product.storeId),
            categoryId: new Id(product.categoryId),
            name: new ProductName(product.name),
            image: nullableMapper(product.image, (v) => new ProductImage(v)),
            price: new ProductPrice(product.price)
        }, new Id(product.id), new CreatedAt(product.createdAt)))
    }

    @queryHandler
    async selectByCategoryId(categoryId: Id) {
        const find_result = await this.client.product.findMany({
            where: {
                categoryId: categoryId.value
            }
        });

        return find_result.map((product) => new ProductEntity({
            storeId: new Id(product.storeId),
            categoryId: new Id(product.categoryId),
            name: new ProductName(product.name),
            image: nullableMapper(product.image, (v) => new ProductImage(v)),
            price: new ProductPrice(product.price)
        }, new Id(product.id), new CreatedAt(product.createdAt)))
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