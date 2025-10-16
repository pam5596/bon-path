import { HonoJwtClient } from "@client";
import { ProductsPayloadSchemas } from "@payload";
import { ProductRepository } from "@repository";
import { ProductPayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class GetProductsUseCase implements BaseUseCase<
    ProductPayloads.Products.GET.Request,
    ProductPayloads.Products.GET.Response
>{
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { product: ProductRepository },
    ){}

    async execute(request: ProductsPayloadSchemas.Products.GET.Request) {
        const { sort, orderBy, limit } = request.getQuery
        const products = await this.repositories.product.selectAll({
            orderBy: {
                [sort as string]: orderBy
            },
            take: limit
        })

        return new ProductsPayloadSchemas.Products.GET.Response({
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