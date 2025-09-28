import BaseService from "./_interface";
import { ServiceError } from "@error";
import { ReceiptImageUrl } from "@models/valueObject";
import { LangChainOpenAiClient } from "@client";
import { ERROR_MESSAGES } from "@constants/errorMessages";
import { StructuredOutputParser } from "langchain/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export class ReceiptOCRService implements BaseService {
    constructor(
        public request: {
            query: ReceiptImageUrl[],
            parser: StructuredOutputParser<any>,
            prompt: ChatPromptTemplate
        },
        public client: LangChainOpenAiClient,
    ){}

    async execute() {
        try {
            const partialedPrompt = await this.request.prompt.partial({
                format_instructions: this.request.parser.getFormatInstructions().replace(/\s+/g, " "),
            });
            const formattedPrompt = await partialedPrompt.format({});

            return await this.client.invoke([{
                role: 'user',
                content: [
                    { type: "text", text: formattedPrompt },
                    ...this.request.query.map((url) => ({ 
                        type: "image_url", 
                        image_url: { url: url.value } 
                    })),
                ],
            }])
        } catch (e) {
            if (e instanceof Error) {
                throw new ServiceError(
                    ERROR_MESSAGES.service.receiptOcr,
                    e.message,
                    this.constructor.name,
                    this.request
                )
            } else {
                throw e
            }
        }
    }
}