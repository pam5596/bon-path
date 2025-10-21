import BaseRoute from "../_interface";
import { ProductsPayloadSchemas } from "@payload";
import { GoogleSearchProductsUseCase } from "@usecase/index";
import { productNameExtractService, searchProductService } from "@lib/services";
import { categoryRepository } from "@lib/repositories";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

export class GoogleSearchProductsRoute extends BaseRoute {
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
                const query = new ProductsPayloadSchemas.GoogleSearch.GET.Request()
                    .schema().query.safeParse(context.req.query())
                if (!query.success) throw this.createError(
                    ERROR_MESSAGES.route.invalidQuery,
                    query
                )
                
                const request = new ProductsPayloadSchemas.GoogleSearch.GET.Request({
                    query: query.data
                })

                const response = await new GoogleSearchProductsUseCase(
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