import { PrismaVectorClient } from "@client";
import { ProductsPayloadSchemas } from "@payload";
import { ProductRepository, ProductVectorRepository } from "@repository";
import { ProductPayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class VectorSearchProductsUseCase implements BaseUseCase<
    ProductPayloads.VectorSearch.GET.Request,
    ProductPayloads.VectorSearch.GET.Response
>{
    constructor(
        public clients: { prismaVector: PrismaVectorClient },
        public repositories: { product: ProductRepository, productVector: ProductVectorRepository },
    ){}

    async execute(request: ProductsPayloadSchemas.VectorSearch.GET.Request) {
        const { keyword, storeId, limit } = request.toValueObjectQuery()

        const productIds = await this.repositories.productVector.searchProductIdByName(keyword)
        const products = await this.repositories.product.selectAll({
            where: {
                id: { in: productIds.map(id => id.value) },
                storeId: storeId.value
            },
            take: limit
        })

        return new ProductsPayloadSchemas.VectorSearch.GET.Response({
            body: {
                products: products.map(product => ({
                    ...product.toPrimitives,
                    id: product.id!.value,
                    createdAt: product.getCreatedAt!.value
                }))
            }
        })
    }
}