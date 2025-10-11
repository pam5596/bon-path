import z from "zod";
import BaseService from "./_interface";
import { ServiceError } from "@lib/error";
import { ProductName, PurchasePrice, PurchaseQuantity, ReceiptImageUrl, StoreName } from "@models/valueObject";
import { LangChainOpenAiClient } from "@client";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { StructuredOutputParser } from "langchain/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { OPEN_AI_PROMPTS } from "@lib/constants/openAiPrompts";

export class ReceiptOCRService implements BaseService {
    constructor(
        public client: LangChainOpenAiClient,
    ){}

    async execute(request: {
            query: ReceiptImageUrl[],
            parser: StructuredOutputParser<any>,
            prompt: ChatPromptTemplate
        }
    ) {
        try {
            const partialedPrompt = await request.prompt.partial({
                format_instructions: request.parser.getFormatInstructions().replace(/\s+/g, " "),
            });
            const formattedPrompt = await partialedPrompt.format({});

            const response = await this.client.invoke([{
                role: 'user',
                content: [
                    { type: "text", text: formattedPrompt },
                    ...request.query.map((url) => ({ 
                        type: "image_url", 
                        image_url: { url: url.value } 
                    })),
                ],
            }])
            const json_response = await new JsonOutputParser().parse(
                response.content.toString()
            ) as z.infer<typeof OPEN_AI_PROMPTS.receiptOcr.zodSchema>

            return {
                store: {
                    name: new StoreName(json_response.store.name)
                },
                products: json_response.products.map(
                    product => ({
                        name: new ProductName(product.name),
                        price: new PurchasePrice(product.price),
                        quantity: new PurchaseQuantity(product.quantity)
                    })
                )
            }
        } catch (e) {
            if (e instanceof Error) {
                throw new ServiceError(
                    ERROR_MESSAGES.service.receiptOcr,
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