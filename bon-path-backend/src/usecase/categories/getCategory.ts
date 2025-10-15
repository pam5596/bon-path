import { HonoJwtClient } from "@client";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { UseCaseError } from "@lib/error";
import { CategoriesPayloadSchemas } from "@payload";
import { CategoryRepository } from "@repository";
import { CategoryPayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class GetCategoryUseCase implements BaseUseCase<
    CategoryPayloads.GET.Request,
    CategoryPayloads.GET.Response
>{
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { category: CategoryRepository },
    ){}

    async execute(request: CategoriesPayloadSchemas.GET.Request) {
        await this.clients.honoJwt.verify(
            request.getCookies.loginSessionId
        )
        const params = request.toValueObjectParams()

        const category = await this.repositories.category.selectById(params.id)
        if (!category) throw new UseCaseError(
            404,
            ERROR_MESSAGES.usecase.categoryNotFound.detail,
            ERROR_MESSAGES.usecase.categoryNotFound.issues,
            this.constructor.name,
            request.getParams
        )

        return new CategoriesPayloadSchemas.GET.Response({
            body: {
                ...category.toPrimitives
            }
        })
    }
}