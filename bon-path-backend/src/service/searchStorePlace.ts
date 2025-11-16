import { GoogleMapPlacesAPIClient } from "@client";
import BaseService from "./_interface";
import { StoreName } from "@models/valueObject";
import { StoreEntity } from "@models/entity";
import { ServiceError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";


export class SearchStorePlaceService implements BaseService {
    constructor(
        public client: GoogleMapPlacesAPIClient
    ){}

    async execute(request: {
        query: StoreName,
        maxCount?: number,
        location?: { longitude: number, latitude: number }
    }): Promise<StoreEntity[]> {
        const response = await this.client.searchPlaces(request.query.value, request.maxCount, request.location);

        return await Promise.all(response.data.places ?
            response.data.places.filter((place) => place.displayName )
            .map(async (place) => {
                const image = place.photos ? 
                    await this.client.getPhotoUri(place.photos.filter(
                        (photo) => photo.name
                    )[0].name!) : undefined

                return StoreEntity.fromPrimitives({
                    name: place.displayName!.text!,
                    image: image ? image.data.photoUri : undefined,
                    googleMapLink: place.googleMapsUri,
                    latitude: place.location?.latitude,
                    longitude: place.location?.longitude
                })
            }) : []
        )
    }
}