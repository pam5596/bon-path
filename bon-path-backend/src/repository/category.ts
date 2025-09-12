import BaseRepository from "./_abstruct";
import queryHandler from "./_queryHandler";
import nullableMapper from "./_nullableMapper";
import { Id, CategoryName } from "@models/valueObject";
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
    async selectById(id: Id) {
        const find_result = await this.client.category.findUnique({
            where: {
                id: id.value,
            },
        });

        if (find_result) {
            return new CategoryEntity({
                parentId: nullableMapper(find_result.parentId, (v) => new Id(v)),
                name: new CategoryName(find_result.name)
            }, new Id(find_result.id));
        } else {
            return find_result;
        }
    }
}