import BaseRoute from "../_interface";
import { ProductsPayloadSchemas } from "@payload";
import { CreateProductUseCase } from "@usecase/index";
import { productRepository, productVectorRepository } from "@lib/repositories";

export class CreateProductRoute extends BaseRoute {
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

                const response = await new CreateProductUseCase(
                    { product: productRepository, productVector: productVectorRepository }
                ).execute(request)

                return context.json(response.getBody)
            },
            new ProductsPayloadSchemas.POST.Request()
        )
    }
}