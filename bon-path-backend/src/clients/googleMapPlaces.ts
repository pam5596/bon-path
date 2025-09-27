import { places_v1 } from "googleapis";

export class GoogleMapPlacesAPIClient extends places_v1.Places {
    private key: string;

    constructor(option: { apiVersion: 'v1', apiKey: string }) {
        const { apiKey, ...options } = option
        super(options)
        this.key = apiKey
    }

    async searchPlaces(textQuery: string) {
        return await this.places.searchText({
            fields: '*',
            key: this.key,
            requestBody: {
                textQuery,
                maxResultCount: 10,
                languageCode: 'ja'
            }
        })
    }

    async getPhotoUri(name: string) {
        return await this.places.photos.getMedia({
            name: `${name}/media`,
            key: this.key,
            maxWidthPx: 400,
            skipHttpRedirect: true
        })
    }
}