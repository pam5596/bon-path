import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { productRepository } from "@lib/repositories";
import { CategoriesPayloadSchemas } from "@payload";
import BaseRoute from "@routes/_interface";
import { GetCategoryProductsUseCase } from "@usecase/categories/getCategoryProducts";

export class GetCategoryProductsRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/categories/:categoryId/products',
                tags: ['商品カテゴリーをリソースとするルート', '商品情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async(context) => {
                const { categoryId } = context.req.param()
                if (isNaN(Number(categoryId))) throw this.createError(
                    ERROR_MESSAGES.route.invalidParams,
                    context.req.param()
                )

                const request = new CategoriesPayloadSchemas.Products.GET.Request({
                    params: { categoryId: Number(categoryId) }
                })

                const response = await new GetCategoryProductsUseCase(
                    { product: productRepository }
                ).execute(request)

                return context.json(response.getBody)
            },
            new CategoriesPayloadSchemas.Products.GET.Request(),
            new CategoriesPayloadSchemas.Products.GET.Response()
        )
    }
}