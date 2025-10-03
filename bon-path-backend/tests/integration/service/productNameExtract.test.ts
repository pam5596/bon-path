import { describe, expect, it } from "vitest";
import { LangChainOpenAiClient } from "@client";
import { OPEN_AI_PROMPTS } from "@constants/openAiPrompts";
import { ProductNameExtractService } from "service";
import { ProductName } from "@models/valueObject";


describe('ProductNameExtracの結合テスト', () => {
    const prompt = LangChainOpenAiClient.createPromptFromMessage(OPEN_AI_PROMPTS.productNameExtract);

    const client = new LangChainOpenAiClient({
        model: 'gpt-4o-mini',
        apiKey: process.env.OPEN_AI_API_KEY!,
        temperature: 0
    })

    const service = new ProductNameExtractService(client)

    it('サイト名から商品名を抽出できること', async () => {
        const response = await service.execute({
            query: new ProductName('Amazon | 【クール】QBB やわらか熟成6Pチーズ×12個'),
            prompt
        })

        console.log(response.content)
        expect(response.content.toString().includes('QBB やわらか熟成6Pチーズ')).toBe(true)
    })
})
