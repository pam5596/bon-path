import { GptOcrPayloads } from "@share/payloads";
import BaseUseCase from "./_interface";
import { LangChainOpenAiClient } from "@client";
import { GptOcrPayloadSchemas } from "@payload";
import { ReceiptOCRService } from "@service";
import { OPEN_AI_PROMPTS } from "@lib/constants/openAiPrompts";
import { InteropZodType } from "@langchain/core/utils/types";

export class GptOcrUseCase implements BaseUseCase<
    GptOcrPayloads.POST.Request,
    GptOcrPayloads.POST.Response
>{
    constructor(
        public services: { receiptOcr: ReceiptOCRService }
    ){}

    async execute(request: GptOcrPayloadSchemas.POST.Request) {
        const body = request.toValueObjectBody()

        const ocrResult = await this.services.receiptOcr.execute({
            query: body.images,
            parser: LangChainOpenAiClient.createParserFromZodSchema(
                OPEN_AI_PROMPTS.receiptOcr.zodSchema as unknown as InteropZodType
            ),
            prompt: LangChainOpenAiClient.createPromptFromMessage(
                OPEN_AI_PROMPTS.receiptOcr
            )
        })

        return new GptOcrPayloadSchemas.POST.Response({
            body: {
                store: {
                    name: ocrResult.store.name.value
                },
                products: ocrResult.products.map(
                    product => ({
                        name: product.name.value,
                        price: product.price.value,
                        quantity: product.quantity.value
                    })
                )
            }
        })
    }
}