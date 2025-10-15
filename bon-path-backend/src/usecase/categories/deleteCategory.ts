import { HonoJwtClient } from "@client";
import { CategoriesPayloadSchemas } from "@payload";
import { CategoryRepository } from "@repository";
import { CategoryPayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class DeleteCategoryUseCase implements BaseUseCase<
    CategoryPayloads.DELETE.Request
>{
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { category: CategoryRepository },
    ){}

    async execute(request: CategoriesPayloadSchemas.DELETE.Request) {
        await this.clients.honoJwt.verify(
            request.getCookies.loginSessionId
        )
        const params = request.toValueObjectParams()

        await this.repositories.category.deleteById(params.id)
    }
}