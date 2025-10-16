import { HonoJwtClient } from "@client";
import { StoresPayloadSchemas } from "@payload";
import { ProductRepository } from "@repository";
import { StorePayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class GetStoreProductsUseCase implements BaseUseCase<
    StorePayloads.Products.GET.Request,
    StorePayloads.Products.GET.Response
>{
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { product: ProductRepository },
    ){}

    async execute(request: StoresPayloadSchemas.Products.GET.Request) {
        const params = request.toValueObjectParams()

        const products = await this.repositories.product.selectByStoreId(params.storeId)

        return new StoresPayloadSchemas.Products.GET.Response({
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