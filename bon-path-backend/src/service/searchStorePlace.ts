import { GoogleMapPlacesAPIClient } from "@client";
import BaseService from "./_interface";
import { StoreName } from "@models/valueObject";
import { StoreEntity } from "@models/entity";
import { ServiceError } from "@error";
import { ERROR_MESSAGES } from "@constants/errorMessages";


export class SearchStorePlaceService implements BaseService {
    constructor(
        public client: GoogleMapPlacesAPIClient
    ){}

    async execute(request: {
        query: StoreName,
        maxCount?: number
    }): Promise<StoreEntity[]> {
        const response = await this.client.searchPlaces(request.query.value, request.maxCount);

        if (!response.data.places) throw new ServiceError(
            ERROR_MESSAGES.service.searchStorePlace.detail,
            ERROR_MESSAGES.service.searchStorePlace.issue,
            this.constructor.name,
            request
        )

        return await Promise.all(response.data.places
            .filter((place) => place.displayName )
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
            })
        )
    }
}