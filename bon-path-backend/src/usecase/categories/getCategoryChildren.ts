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
    ){}

    async execute(request: CategoriesPayloadSchemas.Children.GET.Request) {
        await this.clients.honoJwt.verify(
            request.getCookies.loginSessionId
        )
        const params = request.toValueObjectParams()

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