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
        public request: CategoriesPayloadSchemas.GET.Request
    ){}

    async execute() {
        await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        )
        const params = this.request.toValueObjectParams()

        const category = await this.repositories.category.selectById(params.id)
        if (!category) throw new UseCaseError(
            404,
            ERROR_MESSAGES.usecase.categoryNotFound.detail,
            ERROR_MESSAGES.usecase.categoryNotFound.issues,
            this.constructor.name,
            this.request.getParams
        )

        return new CategoriesPayloadSchemas.GET.Response({
            body: {
                ...category.toPrimitives
            }
        })
    }
}