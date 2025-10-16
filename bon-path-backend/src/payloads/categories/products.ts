import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { CategoryPayloads } from "@share/payloads";
import { CreatedAt, Id, ProductImage, ProductLink, ProductName, ProductPrice } from "@models/valueObject";

export namespace ProductsSchemas {
    export namespace GET {
        export class Request extends BasePayload<CategoryPayloads.Products.GET.Request> {
            schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    }),
                    params: z.strictObject({
                        categoryId: Id.paramSchema()
                    })
                }
            }

            toValueObjectParams() {
                return {
                    categoryId: new Id(this.getParams.categoryId)
                }
            }
        }

        export class Response extends BasePayload<CategoryPayloads.Products.GET.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        products: z.array(
                            z.strictObject({
                                id: Id.paramSchema(),
                                categoryId: Id.paramSchema(),
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