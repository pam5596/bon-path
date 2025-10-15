import { getCookie } from "hono/cookie";
import BaseRoute from "../_interface";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { StoresPayloadSchemas } from "@payload";
import { GetStoreProductsUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { productRepository } from "@lib/repositories";

export class GetStoreProductsRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/stores/:storeId/products',
                tags: ['店舗情報をリソースとするルート', '商品情報ををリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async (context) => {
                const loginSessionId = getCookie(context, 'loginSessionid');
                if (!loginSessionId) throw this.createError(
                    ERROR_MESSAGES.route.invalidCookie,
                    getCookie(context)
                )

                const { storeId } = context.req.param()
                if (isNaN(Number(storeId))) throw this.createError(
                    ERROR_MESSAGES.route.invalidParams,
                    context.req.param()
                )

                const request = new StoresPayloadSchemas.Products.GET.Request({
                    cookies: { loginSessionId },
                    params: { storeId: Number(storeId) }
                })

                const response = await new GetStoreProductsUseCase(
                    { honoJwt: honoJwtLogin },
                    { product: productRepository }
                ).execute(request)

                return context.json(response.getBody)
            },
            new StoresPayloadSchemas.Products.GET.Request(),
            new StoresPayloadSchemas.Products.GET.Response()
        )
    }
}