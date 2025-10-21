import BaseRoute from "../_interface";
import { ProductsPayloadSchemas } from "@payload";
import { VectorSearchProductsUseCase } from "@usecase/index";
import { prismaVector } from "@lib/clients";
import { productRepository, productVectorRepository } from "@lib/repositories";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

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
                const query = new ProductsPayloadSchemas.VectorSearch.GET.Request()
                    .schema().query.safeParse(context.req.query());
                if (!query.success) throw this.createError(
                    ERROR_MESSAGES.route.invalidQuery,
                    query
                )

                const request = new ProductsPayloadSchemas.VectorSearch.GET.Request({
                    query: query.data
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