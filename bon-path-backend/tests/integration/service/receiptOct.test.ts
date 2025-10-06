import { LangChainOpenAiClient } from "@client";
import { OPEN_AI_PROMPTS } from "@constants/openAiPrompts";
import { ReceiptImageUrl } from "@models/valueObject";
import { ReceiptOCRService } from "@service";
import { describe, expect, it } from "vitest";
import { InteropZodType } from "@langchain/core/utils/types";

describe('ReceiptOCRServiceの結合テスト', () => {
    const query = [
        new ReceiptImageUrl('https://faq.sej.co.jp/asset/images/article/image-20230926115407015.png')
    ];
    const prompt = LangChainOpenAiClient.createPromptFromMessage({
        human: OPEN_AI_PROMPTS.receiptOcr.human,
        system: OPEN_AI_PROMPTS.receiptOcr.system
    });
    const parser = LangChainOpenAiClient.createParserFromZodSchema(
        OPEN_AI_PROMPTS.receiptOcr.zodSchema as unknown as InteropZodType
    );

    const client = new LangChainOpenAiClient({
        model: 'gpt-4o-mini',
        apiKey: process.env.OPEN_AI_API_KEY!,
        temperature: 0
    })

    const service = new ReceiptOCRService(client)

    it('レシートの画像をOCR分析できること', async () => {
        try {
            const response = await service.execute({query, prompt, parser})
            const responseContent = await parser.parse(
                Array.isArray(response.content) ?
                    response.content.map((c) => String(c)).join('\n') :
                    response.content
            );

            console.log(response)
            expect(responseContent.store.name.include('セブン-イレブン')).toBe(true)
            expect(responseContent.products.length).lessThan(3)
        } catch(e) {
            console.log(e)
        }
    })
})