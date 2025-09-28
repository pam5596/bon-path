import { SearchStorePlaceService } from "service";
import { GoogleMapPlacesAPIClient } from "@client";
import { describe, expect, it } from "vitest";
import { StoreName } from "@models/valueObject";

describe('SearchStorePlaceServiceの結合テスト', () => {
    const client = new GoogleMapPlacesAPIClient({
        apiVersion: 'v1',
        apiKey: process.env.GOOGLE_API_KEY!
    })
    const service = new SearchStorePlaceService(client);

    it('店舗名で検索できること', async () => {
        const request = new StoreName('オーケー');
        const response = await service.execute(request)

        console.log(response.map((s) => s.toPrimitives))
        expect(response.length).toBe(10)
    })
})