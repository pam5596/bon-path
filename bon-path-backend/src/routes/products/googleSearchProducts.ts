import BaseRoute from "../_interface";
import { ProductsPayloadSchemas } from "@payload";
import { GoogleSearchProductsUseCase } from "@usecase/index";
import { productNameExtractService, searchProductService } from "@lib/services";
import { categoryRepository } from "@lib/repositories";

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
                const query = context.req.query() as any;
                
                const request = new ProductsPayloadSchemas.GoogleSearch.GET.Request({
                    query: {
                        keyword: query.keyword,
                        limit: Number(query.limit) ? Number(query.limit) : undefined  
                    }
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