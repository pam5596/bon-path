import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { StorePayloads } from "@share/payloads";
import { CreatedAt, Id, StoreGoogleMapLink, StoreImage, StoreLatitude, StoreLongitude, StoreName } from "@models/valueObject";

export namespace VectorSearchSchemas {
    export namespace GET {
        export class Request extends BasePayload<StorePayloads.VectorSearch.GET.Request> {
            schema(): { body?: z.ZodObject<{}, z.core.$strict> | undefined; params?: z.ZodObject<{}, z.core.$strict> | undefined; query?: z.ZodObject<{ keyword: z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>; limit?: z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>> | undefined; }, z.core.$strict> | undefined; cookies?: z.ZodObject<{ loginSessionId: z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>; }, z.core.$strict> | undefined; headers?: z.ZodObject<{}, z.core.$strict> | undefined; } {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    }),
                    query: z.strictObject({
                        keyword: StoreName.schema(),
                        limit: z.number().optional()
                    })
                }
            }

            toValueObjectQuery() {
                return {
                    keyword: new StoreName(this.getQuery.keyword),
                    limit: this.getQuery.limit
                }
            }
        }

        export class Response extends BasePayload<StorePayloads.VectorSearch.GET.Response> {
            schema(): { body?: z.ZodObject<{ stores: z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>; }, z.core.$strict> | undefined; params?: z.ZodObject<{}, z.core.$strict> | undefined; query?: z.ZodObject<{}, z.core.$strict> | undefined; cookies?: z.ZodObject<{}, z.core.$strict> | undefined; headers?: z.ZodObject<{}, z.core.$strict> | undefined; } {
                return {
                    body: z.strictObject({
                        stores: z.array(
                            z.strictObject({
                                id: Id.schema(),
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

            toValueObjectBody() {
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