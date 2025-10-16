import BaseRoute from "../_interface";
import { ProductsPayloadSchemas } from "@payload";
import { GoogleMapSearchProductsUseCase } from "@usecase/index";
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
                const query = context.req.query() as any;
                
                const request = new ProductsPayloadSchemas.GoogleSearch.GET.Request({
                    query
                })

                const response = await new GoogleMapSearchProductsUseCase(
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