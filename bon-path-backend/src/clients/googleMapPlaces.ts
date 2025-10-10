import { ERROR_MESSAGES } from "@constants/errorMessages";
import { ClientError } from "@error";
import { places_v1 } from "googleapis";

export class GoogleMapPlacesAPIClient extends places_v1.Places {
    private key: string;

    constructor(option: { apiVersion: 'v1', apiKey: string }) {
        const { apiKey, ...options } = option
        super(options)
        this.key = apiKey
    }

    async searchPlaces(textQuery: string, maxResultCount?: number) {
        try {
            return await this.places.searchText({
                fields: '*',
                key: this.key,
                requestBody: {
                    textQuery,
                    maxResultCount,
                    languageCode: 'ja'
                }
            })
        } catch (e) {
            if (e instanceof Error) {
                throw new ClientError(
                    500,
                    ERROR_MESSAGES.client.googleMapPlaces,
                    e.message,
                    this.constructor.name,
                    'searchPlaces',
                    textQuery
                )
            } else {
                throw e
            }
        }
    }

    async getPhotoUri(name: string) {
        try {
            return await this.places.photos.getMedia({
                name: `${name}/media`,
                key: this.key,
                maxWidthPx: 400,
                skipHttpRedirect: true
            })
        } catch (e) {
            if (e instanceof Error) {
                throw new ClientError(
                    500,
                    ERROR_MESSAGES.client.googleMapPlaces,
                    e.message,
                    this.constructor.name,
                    'getPhotoUri',
                    name
                )
            } else {
                throw e
            }
        }
    }
}