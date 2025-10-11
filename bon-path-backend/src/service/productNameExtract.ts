import z from "zod";
import { LangChainOpenAiClient } from "@client";
import BaseService from "./_interface";
import { Id, ProductName } from "@models/valueObject";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { ServiceError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { CategoryEntity } from "@models/entity";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { OPEN_AI_PROMPTS } from "@lib/constants/openAiPrompts";
import { InteropZodObject } from "@langchain/core/utils/types";

export class ProductNameExtractService implements BaseService {
    constructor(
        public client: LangChainOpenAiClient
    ){}

    async execute(request: {
        query: ProductName[],
        categories: CategoryEntity[],
        parser: StructuredOutputParser<any>,
        prompt: ChatPromptTemplate
    }) {
        try {
            const partialedPrompt = await request.prompt.partial({
                format_instructions: request.parser.getFormatInstructions().replace(/\s+/g, " "),
                categories: request.categories.filter(
                    category => category.parentId
                ).map(
                    category => `id: ${category.id?.value}|name: ${category.toPrimitives.name}`
                ).join('\n')
            });
            const formattedPrompt = await partialedPrompt.format({
                categories: request.categories.filter(
                    category => !category.parentId
                ).map(
                    category => `id: ${category.id?.value}|name: ${category.toPrimitives.name}`
                ).join('\n'),
                query: request.query.map((name) => name.value).join('\n')
            });

            const repsonse = await this.client.invoke([{
                role: 'user',
                content: [{
                    type: 'text',
                    text: formattedPrompt
                }]
            }])
            const json_response = await new JsonOutputParser().parse(
                repsonse.content.toString()
            ) as z.infer<typeof OPEN_AI_PROMPTS.productNameExtract.zodSchema>

            return {
                products: json_response.products.map(
                    product => ({
                        name: new ProductName(product.name),
                        categoryId: new Id(product.categoryId)
                    })
                )
            }
        } catch (e) {
            if (e instanceof Error) {
                throw new ServiceError(
                    ERROR_MESSAGES.service.productNameExtract,
                    e.message,
                    this.constructor.name,
                    request
                )
            } else {
                throw e
            }
        }
    }
}