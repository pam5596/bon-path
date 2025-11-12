import { LangChainOpenAiClient } from "@client";
import { ProductsPayloadSchemas } from "@payload";
import { ProductNameExtractService, SearchProductService } from "@service";
import { ProductPayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";
import { CategoryRepository } from "@repository";
import { OPEN_AI_PROMPTS } from "@lib/constants/openAiPrompts";
import { InteropZodType } from "@langchain/core/utils/types";

export class GoogleSearchProductsUseCase implements BaseUseCase<
    ProductPayloads.GoogleSearch.GET.Request,
    ProductPayloads.GoogleSearch.GET.Response
>{
    constructor(
        public services: { 
            searchProduct: SearchProductService,
            productNameExtract: ProductNameExtractService
        },
        public repositories: {
            category: CategoryRepository
        },
    ){}

    async execute(request: ProductsPayloadSchemas.GoogleSearch.GET.Request) {
        const { keyword, limit } = request.toValueObjectQuery()
        
        const searchedProducts = await this.services.searchProduct.execute({
            query: keyword,
            limit
        })
        const categories = await this.repositories.category.selectAll()

        const extractProducts = await Promise.all(
            searchedProducts.map(
                async (product) => await this.services.productNameExtract.execute({
                    query: product.name,
                    categories,
                    parser: LangChainOpenAiClient.createParserFromZodSchema(
                        OPEN_AI_PROMPTS.productNameExtract.zodSchema as unknown as InteropZodType
                    ),
                    prompt: LangChainOpenAiClient.createPromptFromMessage(
                        OPEN_AI_PROMPTS.productNameExtract
                    )
                })
            )
        )

        return new ProductsPayloadSchemas.GoogleSearch.GET.Response({
            body: {
                products: searchedProducts.map(
                    (product, i) => ({
                        categoryId: extractProducts[i].categoryId.value,
                        name: extractProducts[i].name.value,
                        image: product.image?.value,
                        link: product.link?.value
                    })
                )
            }
        })
    }
}