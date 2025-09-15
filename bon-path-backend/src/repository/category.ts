import BaseRepository from "./_abstruct";
import queryHandler from "./_queryHandler";
import { Id, CategoryName } from "@models/valueObject";
import { CategoryEntity } from "@models/entity";

export default class CategoryRepository extends BaseRepository {
    @queryHandler
    async insertMany(categories: CategoryEntity[]) {
        const create_result = await this.client.category.createManyAndReturn({
            data: categories.map((category) => category.toPrimitives)
        });

        return create_result.map((category) => CategoryEntity.fromPrimitives(category));
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
}