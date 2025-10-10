import { HonoJwtClient } from "@client";
import { CategoriesPayloadSchemas } from "@payload";
import { ProductRepository } from "@repository";
import { CategoryPayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class GetCategoryProductsUseCase implements BaseUseCase<
    CategoryPayloads.Products.GET.Request,
    CategoryPayloads.Products.GET.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { product: ProductRepository },
        public request: CategoriesPayloadSchemas.Products.GET.Request
    ){}

    async execute() {
        await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        )
        const params = this.request.toValueObjectParams()

        const products = await this.repositories.product.selectByCategoryId(params.categoryId)

        return new CategoriesPayloadSchemas.Products.GET.Response({
            body: {
                products: products.map(
                    product => ({
                        ...product.toPrimitives,
                        id: product.id!.value,
                        createdAt: product.getCreatedAt!.value
                    })
                )
            }
        })
    }
}