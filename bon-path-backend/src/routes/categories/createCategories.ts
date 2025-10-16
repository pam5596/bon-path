import { categoryRepository } from "@lib/repositories";
import { CategoriesPayloadSchemas } from "@payload";
import BaseRoute from "@routes/_interface";
import { CreateCategoriesUseCase } from "@usecase/categories/createCategories";

export class CreateCategoriesRoute extends BaseRoute {
    constructor(){
        super(
            {
                method: 'post',
                path: '/categories',
                tags: ['商品カテゴリーををリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 201
            },
            async(context) => {
                const body = await context.req.json()

                const request = new CategoriesPayloadSchemas.POST.Request({body})

                await new CreateCategoriesUseCase(
                    { category: categoryRepository }
                ).execute(request)
            },
            new CategoriesPayloadSchemas.POST.Request()
        )
    }
}