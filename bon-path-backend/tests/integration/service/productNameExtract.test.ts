import { describe, expect, it } from "vitest";
import { LangChainOpenAiClient } from "@client";
import { OPEN_AI_PROMPTS } from "@lib/constants/openAiPrompts";
import { ProductNameExtractService } from "@service";
import { CategoryName, Id, ProductName } from "@models/valueObject";
import { CategoryEntity } from "@models/entity";
import { InteropZodType } from "@langchain/core/utils/types";
import { JsonOutputParser } from "@langchain/core/output_parsers";

describe('ProductNameExtractの結合テスト', () => {
    const prompt = LangChainOpenAiClient.createPromptFromMessage(OPEN_AI_PROMPTS.productNameExtract);
    const parser = LangChainOpenAiClient.createParserFromZodSchema(
        OPEN_AI_PROMPTS.productNameExtract as unknown as InteropZodType
    );

    const client = new LangChainOpenAiClient({
        model: 'gpt-4o-mini',
        apiKey: process.env.OPEN_AI_API_KEY!,
        temperature: 0
    })

    const service = new ProductNameExtractService(client)

    const categories = [
        'チーズ',
        'いちご',
        'パスタ・スパゲッティ',
        'オリーブオイル',
        'からあげ',
        '牛肉'
    ].map(
        (categoryName, i) => new CategoryEntity({
            id: new Id(i+1),
            name: new CategoryName(categoryName)
        })
    )

    it('サイト名から商品名を抽出できること', async () => {
        const response = await service.execute({
            query: [
                new ProductName('Amazon.co.jp: TOMINAGA(トミナガ) ラティーノ スパゲッティ 4kg 大容量 ギリシャ産 パスタ 1.65mm デュラム小麦100% 麺 業務用 電子レンジ : 食品・飲料・お酒'),
                new ProductName('ラ・グランデ スパゲッティ 4kg [ 1.65mm デュラム小麦100% ギリシャ産 業務用 ]'),
                new ProductName('味の素 国産鶏のやさしいからあげ')
            ],
            categories,
            prompt,
            parser
        })

        console.log(response)
    })
})
