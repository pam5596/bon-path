import { CategoriesPayloadSchemas } from "@payload";
import { CategoryRepository } from "@repository";
import { CategoryPayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class DeleteCategoryUseCase implements BaseUseCase<
    CategoryPayloads.DELETE.Request
>{
    constructor(
        public repositories: { category: CategoryRepository },
    ){}

    async execute(request: CategoriesPayloadSchemas.DELETE.Request) {
        const params = request.toValueObjectParams()

        await this.repositories.category.deleteById(params.id)
    }
}