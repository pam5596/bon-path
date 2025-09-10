import { StoreGoogleMapLink, StoreImage, StoreLatitude, StoreLongitude, StoreName, Id, CreatedAt } from "@models/valueObject";

export type StoreType = {
    name: StoreName,
    image?: StoreImage,
    latitude?: StoreLatitude,
    longitude?: StoreLongitude,
    googleMapLink?: StoreGoogleMapLink,
}

export type StoreUpdatableType = {
    image: StoreImage,
    latitude: StoreLatitude,
    longitude: StoreLongitude,
    googleMapLink: StoreGoogleMapLink,
}