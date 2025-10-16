import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { categoryRepository } from "@lib/repositories";
import { CategoriesPayloadSchemas } from "@payload";
import BaseRoute from "@routes/_interface";
import { GetCategoryUseCase } from "@usecase/categories/getCategory";

export class GetCategoryRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/categories/:id',
                tags: ['商品カテゴリーをリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async(context) => {
                const { id } = context.req.param()
                if (isNaN(Number(id))) throw this.createError(
                    ERROR_MESSAGES.route.invalidParams,
                    context.req.param()
                )

                const request = new CategoriesPayloadSchemas.GET.Request({
                    params: { id: Number(id) }
                })

                const response = await new GetCategoryUseCase(
                    { category: categoryRepository }
                ).execute(request)

                return context.json(response.getBody)
            },
            new CategoriesPayloadSchemas.GET.Request(),
            new CategoriesPayloadSchemas.GET.Response()
        )
    }
}