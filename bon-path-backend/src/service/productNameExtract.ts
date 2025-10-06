import { LangChainOpenAiClient } from "@client";
import BaseService from "./_interface";
import { ProductName } from "@models/valueObject";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { ServiceError } from "@error";
import { ERROR_MESSAGES } from "@constants/errorMessages";
import { CategoryEntity } from "@models/entity";

export class ProductNameExtractService implements BaseService {
    constructor(
        public client: LangChainOpenAiClient
    ){}

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
                categories: request.categories.filter(
                    category => !category.parentId
                ).map(
                    category => `id: ${category.id?.value}|name: ${category.toPrimitives.name}`
                ).join('\t\n'),
                query: request.query.value
            });

            return await this.client.invoke([{
                role: 'user',
                content: [{
                    type: 'text',
                    text: formattedPrompt
                }]
            }])
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