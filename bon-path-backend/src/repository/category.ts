import BaseRepository from "./_abstruct";
import queryHandler from "./_queryHandler";
import { Id } from "@models/valueObject";
import { CategoryEntity } from "@models/entity";

export default class CategoryRepository extends BaseRepository {
    @queryHandler
    async insert(category: CategoryEntity) {
        const create_result = await this.client.category.create({
            data: category.toPrimitives
        });

        category.newId = new Id(create_result.id);

        return category;
    }

    @queryHandler
    async selectAll() {
        const find_results = await this.client.category.findMany()
        return find_results.map((category) => CategoryEntity.fromPrimitives(category))
    }

    @queryHandler
    async selectById(id: Id) {
        const find_result = await this.client.category.findUnique({
            where: {
                id: id.value,
            },
        });

        if (find_result) {
            return CategoryEntity.fromPrimitives(find_result)
        } else {
            return find_result;
        }
    }

    @queryHandler
    async selectByParentId(id: Id) {
        const find_results = await this.client.category.findMany({
            where: {
                parentId: id.value
            },
        });

        return find_results.map((category) => CategoryEntity.fromPrimitives(category))
    }

    @queryHandler
    async deleteById(id: Id) {
        await this.client.category.delete({
            where: {
                id: id.value
            }
        })
    }
}