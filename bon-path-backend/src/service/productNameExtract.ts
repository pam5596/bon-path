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

export class ProductNameExtractService implements BaseService {
    constructor(
        public client: LangChainOpenAiClient
    ){}

    private parseCategoryName(category: CategoryEntity, categories: CategoryEntity[]): string {
        if (category.parentId) {
            return this.parseCategoryName(
                categories.find(parent => parent.id?.equals(category.parentId!))!,
                categories
            ) + '>' + category.getValues.name.value
        } else {
            return category.getValues.name.value
        }
    }

    async execute(request: {
        query: ProductName,
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
                categories: request.categories.map(
                    category => `id: ${category.id?.value}|name: ${
                        this.parseCategoryName(category, request.categories)
                    }`
                ).join('\n'),
                query: request.query.value
            });

            const response = await this.client.invoke([{
                role: 'user',
                content: [{
                    type: 'text',
                    text: formattedPrompt
                }]
            }])
            const json_response = await new JsonOutputParser().parse(
                response.content.toString()
            ) as z.infer<typeof OPEN_AI_PROMPTS.productNameExtract.zodSchema>

            return {
                name: new ProductName(json_response.name),
                categoryId: new Id(json_response.categoryId)
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