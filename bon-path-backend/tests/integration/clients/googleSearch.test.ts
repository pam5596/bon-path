import { describe, expect, it } from "vitest";
import { GoogleSearchAPIClient } from "@client";

describe('GoogleSearchAPIClientの結合テスト', () => {
    const client = new GoogleSearchAPIClient({
        apiVersion: 'v1',
        apiKey: process.env.GOOGLE_API_KEY!,
        engineCx: process.env.GOOGLE_SEARCH_CX!
    })

    it('searchImagesメソッドが画像検索を行うこと', async () => {
        const response = await client.searchImages('プロッシモケッソク1.6mm500g', 5);

        console.log(response.data.items)
        expect(response.data.items!.length).toBe(5)
        expect(response.data.items![0].kind).toBe('customsearch#result')
    })
})