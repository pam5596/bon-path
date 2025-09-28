import { describe, expect, it } from "vitest";
import { GoogleMapPlacesAPIClient } from "@client";

describe('GoogleMapPlacesAPIClientの結合テスト', () => {
    const client = new GoogleMapPlacesAPIClient({
        apiVersion: 'v1',
        apiKey: process.env.GOOGLE_API_KEY!
    })
    
    it('searchPlacesが場所検索できること', async () => {
        const response = await client.searchPlaces('オーケー')

        console.log(response.data.places![0])
        expect(response.data.places!.length).toBe(10)
    });

    it('getPhotoUriが画像URIを取得できること', async () => {
        const search_response = await client.searchPlaces('オーケー')
        const name = search_response.data.places![0].photos![0].name!
        const response = await client.getPhotoUri(name)
        
        console.log(response.data)
        expect(response.ok).toBe(true)
        expect(response.data.photoUri).toBeTruthy()
    })
})