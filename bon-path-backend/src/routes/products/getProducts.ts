import BaseRoute from "../_interface";
import { ProductsPayloadSchemas } from "@payload";
import { GetProductsUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
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
                const query = context.req.query()

                const request = new ProductsPayloadSchemas.Products.GET.Request({
                    query
                })

                const response = await new GetProductsUseCase(
                    { honoJwt: honoJwtLogin },
                    { product: productRepository }
                ).execute(request)

                return context.json(response.getBody)
            },
            new ProductsPayloadSchemas.Products.GET.Request(),
            new ProductsPayloadSchemas.Products.GET.Response()
        )
    }
}