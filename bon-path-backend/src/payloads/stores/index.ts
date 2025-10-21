import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { StorePayloads } from "@share/payloads";
import { CreatedAt, Id, StoreGoogleMapLink, StoreImage, StoreLatitude, StoreLongitude, StoreName } from "@models/valueObject";
import { StoresSchemas } from "./stores";
import { ProductsSchemas } from "./products";
import { VectorSearchSchemas } from "./vectorSearch";
import { GoogleMapSearchSchemas } from "./googleMapSearch";

export namespace StoresPayloadSchemas {
    export import Stores = StoresSchemas;
    export import Products = ProductsSchemas;
    export import VectorSearch = VectorSearchSchemas;
    export import GoogleMapSearch = GoogleMapSearchSchemas;

    export namespace GET {
        export class Request extends BasePayload<StorePayloads.GET.Request> {
            schema() {
                return {
                    params: z.strictObject({
                        id: Id.paramSchema()
                    })
                }
            }

            toValueObjectParams() {
                return {
                    id: new Id(this.getParams.id)
                }
            }
        }

        export class Response extends BasePayload<StorePayloads.GET.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        name: StoreName.schema(),
                        image: StoreImage.schema().optional(),
                        latitude: StoreLatitude.schema().optional(),
                        longitude: StoreLongitude.schema().optional(),
                        googleMapLink: StoreGoogleMapLink.schema().optional(),
                        createdAt: CreatedAt.schema()
                    })
                }
            }

            toValueObjectBody() {
                return {
                    name: new StoreName(this.getBody.name),
                    image: this.getBody.image ? new StoreImage(this.getBody.image) : undefined,
                    latitude: this.getBody.latitude ? new StoreLatitude(this.getBody.latitude) : undefined,
                    longitude: this.getBody.longitude ? new StoreLongitude(this.getBody.longitude) : undefined,
                    googleMapLink: this.getBody.googleMapLink ? new StoreGoogleMapLink(this.getBody.googleMapLink) : undefined,
                    createdAt: new CreatedAt(this.getBody.createdAt)
                }
            }
        }
    }

    export namespace POST {
        export class Request extends BasePayload<StorePayloads.POST.Request> {
            schema() {
                return {
                    body: z.strictObject({
                        name: StoreName.schema(),
                        image: StoreImage.schema().optional(),
                        latitude: StoreLatitude.schema().optional(),
                        longitude: StoreLongitude.schema().optional(),
                        googleMapLink: StoreGoogleMapLink.schema().optional()
                    })
                }
            }
            
            toValueObjectBody() {
                return {
                    name: new StoreName(this.getBody.name),
                    image: this.getBody.image ? new StoreImage(this.getBody.image) : undefined,
                    latitude: this.getBody.latitude ? new StoreLatitude(this.getBody.latitude) : undefined,
                    longitude: this.getBody.longitude ? new StoreLongitude(this.getBody.longitude) : undefined,
                    googleMapLink: this.getBody.googleMapLink ? new StoreGoogleMapLink(this.getBody.googleMapLink) : undefined
                }
            }
        }

        export class Response extends BasePayload<StorePayloads.POST.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        id: Id.paramSchema()
                    })
                }
            }

            toValueObjectBody() {
                return {
                    id: new Id(this.getBody.id)
                }
            }
        }
    }

    export namespace PATCH {
        export class Request extends BasePayload<StorePayloads.PATCH.Request> {
            schema(){
                return {
                    params: z.strictObject({
                        id: Id.paramSchema()
                    }),
                    body: z.strictObject({
                        name: StoreName.schema(),
                        image: StoreImage.schema().optional(),
                        latitude: StoreLatitude.schema().optional(),
                        longitude: StoreLongitude.schema().optional(),
                        googleMapLink: StoreGoogleMapLink.schema().optional(),
                    })
                }
            }

            toValueObjectParams() {
                return {
                    id: new Id(this.getParams.id)
                }
            }

            toValueObjectBody() {
                return {
                    name: new StoreName(this.getBody.name),
                    image: this.getBody.image ? new StoreImage(this.getBody.image) : undefined,
                    latitude: this.getBody.latitude ? new StoreLatitude(this.getBody.latitude) : undefined,
                    longitude: this.getBody.longitude ? new StoreLongitude(this.getBody.longitude) : undefined,
                    googleMapLink: this.getBody.googleMapLink ? new StoreGoogleMapLink(this.getBody.googleMapLink) : undefined
                }
            }
        }
    }

    export namespace DELETE {
        export class Request extends BasePayload<StorePayloads.DELETE.Request> {
            schema() {
                return {
                    params: z.strictObject({
                        id: Id.paramSchema()
                    })
                }
            }

            toValueObjectParams() {
                return {
                    id: new Id(this.getParams.id)
                }
            }
        }
    }
}