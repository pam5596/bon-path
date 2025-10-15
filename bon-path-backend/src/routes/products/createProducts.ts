import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import BaseRoute from "../_interface";
import { getCookie } from "hono/cookie";
import { ProductsPayloadSchemas } from "@payload";
import { CreateProductsUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
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
                const loginSessionId = getCookie(context, 'loginSessionid');
                if (!loginSessionId) throw this.createError(
                    ERROR_MESSAGES.route.invalidCookie,
                    getCookie(context)
                )

                const body = await context.req.json()

                const request = new ProductsPayloadSchemas.POST.Request({
                    cookies: { loginSessionId },
                    body
                })

                await new CreateProductsUseCase(
                    { honoJwt: honoJwtLogin },
                    { product: productRepository }
                ).execute(request)
            },
            new ProductsPayloadSchemas.POST.Request()
        )
    }
}