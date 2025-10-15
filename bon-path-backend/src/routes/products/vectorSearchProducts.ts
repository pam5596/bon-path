import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import BaseRoute from "../_interface";
import { getCookie } from "hono/cookie";
import { ProductsPayloadSchemas } from "@payload";
import { VectorSearchProductsUseCase } from "@usecase/index";
import { honoJwtLogin, prismaVector } from "@lib/clients";
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
                const loginSessionId = getCookie(context, 'loginSessionid');
                if (!loginSessionId) throw this.createError(
                    ERROR_MESSAGES.route.invalidCookie,
                    getCookie(context)
                )

                const query = context.req.query() as any

                const request = new ProductsPayloadSchemas.VectorSearch.GET.Request({
                    cookies: { loginSessionId },
                    query
                })

                const response = await new VectorSearchProductsUseCase(
                    { honoJwt: honoJwtLogin, prismaVector },
                    { product: productRepository, productVector: productVectorRepository}
                ).execute(request)

                return context.json(response.getBody)
            },
            new ProductsPayloadSchemas.VectorSearch.GET.Request(),
            new ProductsPayloadSchemas.VectorSearch.GET.Response()
        )
    }
}