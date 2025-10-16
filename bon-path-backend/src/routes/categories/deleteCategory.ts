import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { categoryRepository } from "@lib/repositories";
import { CategoriesPayloadSchemas } from "@payload";
import BaseRoute from "@routes/_interface";
import { DeleteCategoryUseCase } from "@usecase/categories/deleteCategory";

export class DeleteCategoryRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'delete',
                path: '/categories/:id',
                tags: ['商品カテゴリーををリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 204
            },
            async(context) => {
                const { id } = context.req.param()
                if (isNaN(Number(id))) throw this.createError(
                    ERROR_MESSAGES.route.invalidParams,
                    context.req.param()
                )

                const request = new CategoriesPayloadSchemas.DELETE.Request({
                    params: { id: Number(id) }
                })

                await new DeleteCategoryUseCase(
                    { category: categoryRepository }
                ).execute(request)
            },
            new CategoriesPayloadSchemas.DELETE.Request()
        )
    }
}