import BaseRoute from "../_interface";
import { ProductsPayloadSchemas } from "@payload";
import { GetProductsUseCase } from "@usecase/index";
import { productRepository } from "@lib/repositories";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

export class GetProductsRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/products',
                tags: ['商品情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async (context) => {
                const query = new ProductsPayloadSchemas.Products.GET.Request()
                    .schema().query.safeParse(context.req.query())
                if (!query.success) throw this.createError(
                    ERROR_MESSAGES.route.invalidQuery,
                    query
                )

                const request = new ProductsPayloadSchemas.Products.GET.Request({
                    query: query.data
                })

                const response = await new GetProductsUseCase(
                    { product: productRepository }
                ).execute(request)

                return context.json(response.getBody)
            },
            new ProductsPayloadSchemas.Products.GET.Request(),
            new ProductsPayloadSchemas.Products.GET.Response()
        )
    }
}