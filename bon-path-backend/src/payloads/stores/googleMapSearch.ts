import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { StorePayloads } from "@share/payloads";
import { StoreGoogleMapLink, StoreImage, StoreLatitude, StoreLongitude, StoreName } from "@models/valueObject";

export namespace GoogleMapSearchSchemas {
    export namespace GET {
        export class Request extends BasePayload<StorePayloads.GoogleMapSearch.GET.Request> {
            schema() {
                return {
                    query: z.strictObject({
                        keyword: StoreName.schema(),
                        longitude: StoreLongitude.querySchema().optional(),
                        latitude: StoreLatitude.querySchema().optional(),
                        limit: z.coerce.number().int().min(1).optional(),
                    })
                }
            }

            toValueObjectQuery() {
                return {
                    keyword: new StoreName(this.getQuery.keyword),
                    longitude: this.getQuery.longitude ? new StoreLongitude(this.getQuery.longitude) : undefined,
                    latitude: this.getQuery.latitude ? new StoreLatitude(this.getQuery.latitude) : undefined,
                    limit: this.getQuery.limit
                }
            }
        }

        export class Response extends BasePayload<StorePayloads.GoogleMapSearch.GET.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        stores: z.array(
                            z.strictObject({
                                name: StoreName.schema(),
                                image: StoreImage.schema().optional(),
                                latitude: StoreLatitude.schema().optional(),
                                longitude: StoreLongitude.schema().optional(),
                                googleMapLink: StoreGoogleMapLink.schema().optional(),                       
                            })
                        )
                    })
                }
            }

            toValueObjectBody() {
                return {
                    stores: this.getBody.stores.map(
                        store => ({
                            name: new StoreName(store.name),
                            image: store.image ? new StoreImage(store.image) : undefined,
                            latitude: store.latitude ? new StoreLatitude(store.latitude) : undefined,
                            longitude: store.longitude ? new StoreLongitude(store.longitude) : undefined,
                            googleMapLink: store.googleMapLink ? new StoreGoogleMapLink(store.googleMapLink) : undefined
                        })
                    )
                }
            }
        }
    }
}