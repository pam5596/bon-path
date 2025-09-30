import { LangChainOpenAiClient } from "@client";
import BaseService from "./_interface";
import { ProductName } from "@models/valueObject";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ServiceError } from "@error";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export class ProductNameExtractService implements BaseService {
    constructor(
        public client: LangChainOpenAiClient
    ){}

    async execute(request: {
        query: ProductName,
        prompt: ChatPromptTemplate
    }) {
        try {
            const formattedPrompt = await request.prompt.format({ query: request.query })
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