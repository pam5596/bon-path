import { getCookie } from "hono/cookie";
import BaseRoute from "../_interface";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { ProductsPayloadSchemas } from "@payload";
import { UpdateProductUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
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
                const loginSessionId = getCookie(context, 'loginSessionid');
                if (!loginSessionId) throw this.createError(
                    ERROR_MESSAGES.route.invalidCookie,
                    getCookie(context)
                )

                const { id } = context.req.param()
                const body = await context.req.json()

                const request = new ProductsPayloadSchemas.PATCH.Request({
                    cookies: { loginSessionId },
                    params: { id: Number(id) },
                    body
                })

                await new UpdateProductUseCase(
                    { honoJwt: honoJwtLogin },
                    { product: productRepository }
                ).execute(request)
            },
            new ProductsPayloadSchemas.PATCH.Request()
        )
    }
}