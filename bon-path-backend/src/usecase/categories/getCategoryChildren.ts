import { HonoJwtClient } from "@client";
import { CategoriesPayloadSchemas } from "@payload";
import { CategoryRepository } from "@repository";
import { CategoryPayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class GetCategoryChildrenUseCase implements BaseUseCase<
    CategoryPayloads.Children.GET.Request,
    CategoryPayloads.Children.GET.Response
>{
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { category: CategoryRepository },
        public request: CategoriesPayloadSchemas.Children.GET.Request
    ){}

    async execute() {
        await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        )
        const params = this.request.toValueObjectParams()

        const categories = await this.repositories.category.selectByParentId(params.parantId)

        return new CategoriesPayloadSchemas.Children.GET.Response({
            body: {
                categories: categories.map(category => ({
                    id: category.id!.value,
                    ...category.toPrimitives 
                }))
            }
        })
    }
}