import BaseRoute from "../_interface";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { ProductsPayloadSchemas } from "@payload";
import { GetProductUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { productRepository } from "@lib/repositories";

export class GetProductRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/products/:id',
                tags: ['商品情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async (context) => {
                const { id } = context.req.param()
                if (isNaN(Number(id))) throw this.createError(
                    ERROR_MESSAGES.route.invalidParams,
                    context.req.param()
                )

                const request = new ProductsPayloadSchemas.GET.Request({
                    params: { id: Number(id) }
                })

                const response = await new GetProductUseCase(
                    { honoJwt: honoJwtLogin },
                    { product: productRepository }
                ).execute(request)

                return context.json(response.getBody)
            },
            new ProductsPayloadSchemas.GET.Request(),
            new ProductsPayloadSchemas.GET.Response()
        )
    }
}