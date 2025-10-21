import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { StorePayloads } from "@share/payloads";
import { CreatedAt, Id, StoreGoogleMapLink, StoreImage, StoreLatitude, StoreLongitude, StoreName } from "@models/valueObject";

export namespace StoresSchemas {
    export namespace GET {
        export class Request extends BasePayload<StorePayloads.Stores.GET.Request> {
            schema() {
                return {
                    query: z.strictObject({
                        latitude: StoreLatitude.querySchema().optional(),
                        longitude: StoreLongitude.querySchema().optional(),
                        radius: z.coerce.number().optional(),
                        limit: z.coerce.number().int().min(1).optional()
                    })
                }
            }

            toValueObjectParams() {
                return {
                    latitude: this.getQuery.latitude ? new StoreLatitude(this.getQuery.latitude) : undefined,
                    longitude: this.getQuery.longitude ? new StoreLongitude(this.getQuery.longitude) : undefined,
                    radius: this.getQuery.radius,
                    limit: this.getQuery.limit
                }
            }
        }

        export class Response extends BasePayload<StorePayloads.Stores.GET.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        stores: z.array(
                            z.strictObject({
                                id: Id.paramSchema(),
                                name: StoreName.schema(),
                                image: StoreImage.schema().optional(),
                                latitude: StoreLatitude.schema().optional(),
                                longitude: StoreLongitude.schema().optional(),
                                googleMapLink: StoreGoogleMapLink.schema().optional(),
                                createdAt: CreatedAt.schema()
                            })
                        )
                    })
                }
            }

            toValueObjectBody(){
                return {
                    stores: this.getBody.stores.map(
                        store => ({
                            id: new Id(store.id),
                            name: new StoreName(store.name),
                            image: store.image ? new StoreImage(store.image) : undefined,
                            latitude: store.latitude ? new StoreLatitude(store.latitude) : undefined,
                            longitude: store.longitude ? new StoreLongitude(store.longitude) : undefined,
                            googleMapLink: store.googleMapLink ? new StoreGoogleMapLink(store.googleMapLink) : undefined,
                            createdAt: new CreatedAt(store.createdAt)
                        })
                    )
                }
            }
        }
    }
}