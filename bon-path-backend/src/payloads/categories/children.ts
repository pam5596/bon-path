import { z } from "@hono/zod-openapi";
import BasePayload from "../_abstruct";
import { CategoryPayloads } from "@share/payloads";
import { CategoryName, Id } from "@models/valueObject";

export namespace ChildrenSchemas {
    export namespace GET {
        export class Request extends BasePayload<CategoryPayloads.Children.GET.Request> {
            schema() {
                return {
                    cookies: z.strictObject({
                        loginSessionId: z.string()
                    }),
                    params: z.strictObject({
                        parantId: Id.schema()
                    })
                }
            }

            toValueObjectParams() {
                return {
                    parantId: new Id(this.getParams.parantId)
                }
            }
        }

        export class Response extends BasePayload<CategoryPayloads.Children.GET.Response> {
            schema() {
                return {
                    body: z.strictObject({
                        categories: z.array(
                            z.strictObject({
                                id: Id.schema(),
                                parentId: Id.schema().optional(),
                                name: CategoryName.schema()
                            })
                        )
                    })
                }
            }

            toValueObjectBody() {
                return {
                    categories: this.getBody.categories.map(category => ({
                        id: new Id(category.id),
                        parentId: category.parentId ? new Id(category.parentId) : undefined,
                        name: new CategoryName(category.name)
                    }))
                }
            }
        }
    }
}