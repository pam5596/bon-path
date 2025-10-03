import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { ProductPayloads } from "@share/payloads";
import { CreatedAt, Id, ProductImage, ProductLink, ProductName, ProductPrice } from "@models/valueObject";

export namespace ProductsSchemas {
    export namespace GET {
        export class Request extends BasePayload<ProductPayloads.Products.GET.Request> {
            schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    }),
                    query: z.strictObject({
                        sort: z.enum(['price']).optional(),
                        orderBy: z.enum(['asc', 'desc']).optional(),
                        limit: z.number().optional()
                    })
                }
            }
        }

        export class Response extends BasePayload<ProductPayloads.Products.GET.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        products: z.array(
                            z.strictObject({
                                id: Id.schema(),
                                storeId: Id.schema(),
                                categoryId: Id.schema(),
                                name: ProductName.schema(),
                                image: ProductImage.schema().optional(),
                                link: ProductLink.schema().optional(),
                                price: ProductPrice.schema(),
                                createdAt: CreatedAt.schema()
                            })
                        )
                    })
                }
            }

            toValueObjectBody() {
                return {
                    products: this.getBody.products.map(
                        product => ({
                            id: new Id(product.id),
                            storeId: new Id(product.storeId),
                            categoryId: new Id(product.categoryId),
                            name: new ProductName(product.name),
                            image: product.image ? new ProductImage(product.image) : undefined,
                            link: product.link ? new ProductLink(product.link) : undefined,
                            price: new ProductPrice(product.price),
                            createdAt: new CreatedAt(product.createdAt)
                        })
                    )
                }
            }
        }
    }
}