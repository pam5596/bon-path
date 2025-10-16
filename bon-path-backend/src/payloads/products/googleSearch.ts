import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { ProductPayloads } from "@share/payloads";
import { Id, ProductImage, ProductLink, ProductName } from "@models/valueObject";

export namespace GoogleSearchSchemas {
    export namespace GET{
        export class Request extends BasePayload<ProductPayloads.GoogleSearch.GET.Request> {
            schema() {
                return {
                    query: z.strictObject({
                        keyword: ProductName.schema(),
                        limit: z.number().optional()
                    })
                }
            }

            toValueObjectQuery(){
                return {
                    keyword: new ProductName(this.getQuery.keyword),
                    limit: this.getQuery.limit
                }
            }
        }

        export class Response extends BasePayload<ProductPayloads.GoogleSearch.GET.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        products: z.array(
                            z.strictObject({
                                categoryId: Id.schema(),
                                name: ProductName.schema(),
                                image: ProductImage.schema().optional(),
                                link: ProductLink.schema().optional(),
                            })
                        )
                    })
                }
            }

            toValueObjectBody() {
                return {
                    products: this.getBody.products.map(
                        product => ({
                            categoryId: new Id(product.categoryId),
                            name: new ProductName(product.name),
                            image: product.image ? new ProductImage(product.image) : undefined,
                            link: product.link ? new ProductLink(product.link) : undefined,
                        })
                    )
                }
            }
        }
    }
}