import BaseRoute from "../_interface";
import { ProductsPayloadSchemas } from "@payload";
import { UpdateProductUseCase } from "@usecase/index";
import { productRepository } from "@lib/repositories";

export class UpdateProductRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'patch',
                path: '/products/:id',
                tags: ['商品情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 204
            },
            async (context) => {
                const { id } = context.req.param()
                const body = await context.req.json()

                const request = new ProductsPayloadSchemas.PATCH.Request({
                    params: { id: Number(id) },
                    body
                })

                await new UpdateProductUseCase(
                    { product: productRepository }
                ).execute(request)
            },
            new ProductsPayloadSchemas.PATCH.Request()
        )
    }
}