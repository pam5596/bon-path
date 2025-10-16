import BaseRoute from "../_interface";
import { ProductsPayloadSchemas } from "@payload";
import { VectorSearchProductsUseCase } from "@usecase/index";
import { prismaVector } from "@lib/clients";
import { productRepository, productVectorRepository } from "@lib/repositories";

export class VectorSearchProductsRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/products/vector-search',
                tags: ['商品情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async (context) => {
                const query = context.req.query() as any

                const request = new ProductsPayloadSchemas.VectorSearch.GET.Request({
                    query
                })

                const response = await new VectorSearchProductsUseCase(
                    { prismaVector },
                    { product: productRepository, productVector: productVectorRepository}
                ).execute(request)

                return context.json(response.getBody)
            },
            new ProductsPayloadSchemas.VectorSearch.GET.Request(),
            new ProductsPayloadSchemas.VectorSearch.GET.Response()
        )
    }
}