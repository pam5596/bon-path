import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { CategoryPayloads } from "@share/payloads";
import { CategoryName, Id } from "@models/valueObject";
import { ChildrenSchemas } from "./children";
import { ProductsSchemas } from "./products";

export namespace CategoriesPayloadSchemas {
    export import Children = ChildrenSchemas;
    export import Products = ProductsSchemas;

    export namespace GET {
        export class Request extends BasePayload<CategoryPayloads.GET.Request> {
            schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    }),
                    params: z.strictObject({
                        id: Id.schema()
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

    export namespace POST {
        export class Request extends BasePayload<CategoryPayloads.POST.Request> {
            schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    }),
                    body: z.strictObject({
                        categories: z.array(
                            z.strictObject({
                                parentId: Id.schema().optional(),
                                name: CategoryName.schema()
                            })
                        )
                    })
                }
            }

            toValueObjectBody() {
                return {
                    categories: this.getBody.categories.map(
                        category => ({
                            parentId: category.parentId ? new Id(category.parentId) : undefined,
                            name: new CategoryName(category.name)
                        })
                    )
                }
            }
        }
    }

    export namespace DELETE {
        export class Request extends BasePayload<CategoryPayloads.DELETE.Request> {
            schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    }),
                    params: z.strictObject({
                        id: Id.schema()
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
