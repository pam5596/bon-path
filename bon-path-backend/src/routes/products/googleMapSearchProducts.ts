import { getCookie } from "hono/cookie";
import BaseRoute from "../_interface";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { ProductsPayloadSchemas } from "@payload";
import { GoogleMapSearchProductsUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { productNameExtractService, searchProductService } from "@lib/services";
import { categoryRepository } from "@lib/repositories";

export class GoogleMapSearchProductsRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/products/google-search',
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

                const query = context.req.query() as any;
                
                const request = new ProductsPayloadSchemas.GoogleSearch.GET.Request({
                    cookies: { loginSessionId },
                    query
                })

                const response = await new GoogleMapSearchProductsUseCase(
                    { honoJwt: honoJwtLogin },
                    { 
                        searchProduct: searchProductService, 
                        productNameExtract: productNameExtractService 
                    },
                    {
                        category: categoryRepository
                    }
                ).execute(request)

                return context.json(response.getBody)
            },
            new ProductsPayloadSchemas.GoogleSearch.GET.Request(),
            new ProductsPayloadSchemas.GoogleSearch.GET.Response()
        )
    }
}