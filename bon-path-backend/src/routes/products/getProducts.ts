import BaseRoute from "../_interface";
import { ProductsPayloadSchemas } from "@payload";
import { GetProductsUseCase } from "@usecase/index";
import { productRepository } from "@lib/repositories";

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
                const query= context.req.query()

                const request = new ProductsPayloadSchemas.Products.GET.Request({
                    query: {
                        ...query,
                        limit: Number(query.limit) ? Number(query.limit) : undefined 
                    }
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