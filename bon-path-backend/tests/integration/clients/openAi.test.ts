import { describe, expect, it } from "vitest";
import { LangChainOpenAiClient } from "@client";

describe('LangChainOpenAiClientの結合テスト', () => {
    const client = new LangChainOpenAiClient({
        model: 'gpt-4o-mini',
        apiKey: process.env.OPEN_AI_API_KEY!,
        temperature: 0
    });

    it('APIキーが読み込まれていて正常に接続できること', async () => {
        const response = await client.invoke("Say 'Hello, LangChain!'")
        console.log(response)
    });
})