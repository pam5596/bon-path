import { StoreGoogleMapLink, StoreImage, StoreLatitude, StoreLongitude, StoreName } from "@models/valueObject";

export type StoreType = {
    name: StoreName,
    image?: StoreImage,
    latitude?: StoreLatitude,
    longitude?: StoreLongitude,
    googleMapLink?: StoreGoogleMapLink,
}