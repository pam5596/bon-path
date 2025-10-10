import { GptOcrPayloads } from "@share/payloads";
import BaseUseCase from "./_interface";
import { HonoJwtClient, LangChainOpenAiClient } from "@client";
import { GptOcrPayloadSchemas } from "@payload";
import { ReceiptOCRService } from "@service";
import { OPEN_AI_PROMPTS } from "@constants/openAiPrompts";
import { InteropZodType } from "@langchain/core/utils/types";

export class GptOcrUseCase implements BaseUseCase<
    GptOcrPayloads.POST.Request,
    GptOcrPayloads.POST.Response
>{
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public services: { receiptOcr: ReceiptOCRService },
        public request: GptOcrPayloadSchemas.POST.Request
    ){}

    async execute() {
        await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        )
        const body = this.request.toValueObjectBody()

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