import { SearchProductService } from "@service";
import { GoogleSearchAPIClient } from "@client";
import { describe, it, expect } from "vitest";
import { ProductName } from "@models/valueObject";

describe('SearchProductServiceの結合テスト', () => {
    const client = new GoogleSearchAPIClient({ 
        apiVersion: 'v1',
        apiKey: process.env.GOOGLE_API_KEY!,
        engineCx: process.env.GOOGLE_SEARCH_CX!
    })

    const service = new SearchProductService(client)

    it('商品名で検索できること', async () => {
        const request = new ProductName('qbbヤワラカジュクセイ');
        const response = await service.execute({ query: request });

        console.log(response)
        expect(response.length).toBe(10)
    })
})