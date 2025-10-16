import BaseRoute from "../_interface";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { ProductsPayloadSchemas } from "@payload";
import { DeleteProductUseCase } from "@usecase/index";
import { productRepository } from "@lib/repositories";

export class DeleteProductRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'delete',
                path: '/products/:id',
                tags: ['商品情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 204
            },
            async (context) => {
                const { id } = context.req.param()
                if (isNaN(Number(id))) throw this.createError(
                    ERROR_MESSAGES.route.invalidParams,
                    context.req.param()
                )

                const request = new ProductsPayloadSchemas.DELETE.Request({
                    params: { id: Number(id) }
                })

                await new DeleteProductUseCase(
                    { product: productRepository }
                ).execute(request)
            },
            new ProductsPayloadSchemas.DELETE.Request()
        )
    }
}