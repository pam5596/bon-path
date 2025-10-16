import BaseRoute from "../_interface";
import { ProductsPayloadSchemas } from "@payload";
import { CreateProductsUseCase } from "@usecase/index";
import { productRepository } from "@lib/repositories";

export class CreateProductsRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'post',
                path: '/products',
                tags: ['商品情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 201
            },
            async (context) => {
                const body = await context.req.json()

                const request = new ProductsPayloadSchemas.POST.Request({
                    body
                })

                await new CreateProductsUseCase(
                    { product: productRepository }
                ).execute(request)
            },
            new ProductsPayloadSchemas.POST.Request()
        )
    }
}