import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { ProductPayloads } from "@share/payloads";
import { CreatedAt, Id, ProductImage, ProductLink, ProductName, ProductPrice } from "@models/valueObject";
import { ProductsSchemas } from "./products";
import { GoogleSearchSchemas } from "./googleSearch";
import { VectorSearchSchemas } from "./vectorSearch";

export namespace ProductsPayloadSchemas {
    export import Products = ProductsSchemas;
    export import GoogleSearch = GoogleSearchSchemas;
    export import VectorSearch = VectorSearchSchemas;

    export namespace GET {
        export class Request extends BasePayload<ProductPayloads.GET.Request> {
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

        export class Response extends BasePayload<ProductPayloads.GET.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        storeId: Id.paramSchema(),
                        categoryId: Id.paramSchema(),
                        name: ProductName.schema(),
                        image: ProductImage.schema().optional(),
                        link: ProductImage.schema().optional(),
                        price: ProductPrice.schema(),
                        createdAt: CreatedAt.schema()
                    })
                }
            }

            toValueObjectBody() {
                return {
                    storeId: new Id(this.getBody.storeId),
                    categoryId: new Id(this.getBody.categoryId),
                    name: new ProductName(this.getBody.name),
                    image: this.getBody.image ? new ProductImage(this.getBody.image) : undefined,
                    link: this.getBody.link ? new ProductImage(this.getBody.link) : undefined,
                    price: new ProductPrice(this.getBody.price),
                    createdAt: new CreatedAt(this.getBody.createdAt)
                }
            }
        }
    }

    export namespace POST {
        export class Request extends BasePayload<ProductPayloads.POST.Request> {
            schema() {
                return {
                    body: z.strictObject({
                        storeId: Id.paramSchema(),
                        categoryId: Id.paramSchema(),
                        name: ProductName.schema(),
                        image: ProductImage.schema().optional(),
                        link: ProductLink.schema().optional(),
                        price: ProductPrice.schema()
                    })
                }
            }

            toValueObjectBody() {
                return {
                    storeId: new Id(this.getBody.storeId),
                    categoryId: new Id(this.getBody.categoryId),
                    name: new ProductName(this.getBody.name),
                    image: this.getBody.image ? new ProductImage(this.getBody.image) : undefined,
                    link: this.getBody.link ? new ProductLink(this.getBody.link) : undefined,
                    price: new ProductPrice(this.getBody.price)
                }
            }
        }

        export class Response extends BasePayload<ProductPayloads.POST.Response> {
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
        export class Request extends BasePayload<ProductPayloads.PATCH.Request> {
            schema() {
                return {
                    params: z.strictObject({
                        id: Id.paramSchema()
                    }),
                    body: z.strictObject({
                        categoryId: Id.paramSchema(),
                        name: ProductName.schema(),
                        image: ProductImage.schema().optional(),
                        link: ProductLink.schema().optional(),
                        price: ProductPrice.schema()
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
                    categoryId: new Id(this.getBody.categoryId),
                    name: new ProductName(this.getBody.name),
                    image: this.getBody.image ? new ProductImage(this.getBody.image) : undefined,
                    link: this.getBody.link ? new ProductLink(this.getBody.link) : undefined,
                    price: new ProductPrice(this.getBody.price)
                }
            }
        }
    }

    export namespace DELETE {
        export class Request extends BasePayload<ProductPayloads.DELETE.Request> {
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