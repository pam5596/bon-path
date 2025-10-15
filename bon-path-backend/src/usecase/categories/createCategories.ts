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
    ){}

    async execute(request: CategoriesPayloadSchemas.POST.Request) {
        await this.clients.honoJwt.verify(
            request.getCookies.loginSessionId
        )
        const body = request.toValueObjectBody()

        const categories = body.categories.map(
            category => new CategoryEntity({ ...category })
        )

        await this.repositories.category.insertMany(categories)
    }
}