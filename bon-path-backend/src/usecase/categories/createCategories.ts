import { HonoJwtClient } from "@client";
import { CategoryEntity } from "@models/entity";
import { CategoriesPayloadSchemas } from "@payload";
import { CategoryRepository } from "@repository";
import { CategoryPayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class CreateCategoriesUseCase implements BaseUseCase<
    CategoryPayloads.POST.Request
>{
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { category: CategoryRepository },
        public request: CategoriesPayloadSchemas.POST.Request
    ){}

    async execute() {
        await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        )
        const body = this.request.toValueObjectBody()

        const categories = body.categories.map(
            category => new CategoryEntity({ ...category })
        )

        await this.repositories.category.insertMany(categories)
    }
}