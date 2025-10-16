import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { categoryRepository } from "@lib/repositories";
import { CategoriesPayloadSchemas } from "@payload";
import BaseRoute from "@routes/_interface";
import { GetCategoryChildrenUseCase } from "@usecase/categories/getCategoryChildren";

export class GetCategoryChildren extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/categories/:parentId/children',
                tags: ['商品カテゴリーををリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async(context) => {
                const { parentId } = context.req.param()
                if (isNaN(Number(parentId))) throw this.createError(
                    ERROR_MESSAGES.route.invalidParams,
                    context.req.param()
                )

                const request = new CategoriesPayloadSchemas.Children.GET.Request({
                    params: { parentId: Number(parentId) }
                })

                const response = await new GetCategoryChildrenUseCase(
                    { category: categoryRepository }
                ).execute(request)

                return context.json(response.getBody)
            },
            new CategoriesPayloadSchemas.Children.GET.Request(),
            new CategoriesPayloadSchemas.Children.GET.Response()
        )
    }
}