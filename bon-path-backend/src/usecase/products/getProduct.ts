import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { UseCaseError } from "@lib/error";
import { ProductsPayloadSchemas } from "@payload";
import { ProductRepository } from "@repository";
import { ProductPayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class GetProductUseCase implements BaseUseCase<
    ProductPayloads.GET.Request,
    ProductPayloads.GET.Response
>{
    constructor(
        public repositories: { product: ProductRepository },
    ){}

    async execute(request: ProductsPayloadSchemas.GET.Request) {
        const params = request.toValueObjectParams()

        const product = await this.repositories.product.selectById(params.id)
        if (!product) throw new UseCaseError(
            404,
            ERROR_MESSAGES.usecase.productNotFound.detail,
            ERROR_MESSAGES.usecase.productNotFound.issues,
            this.constructor.name,
            request.getParams
        )
        
        return new ProductsPayloadSchemas.GET.Response({
            body: {
                ...product.toPrimitives,
                createdAt: product.getCreatedAt!.value
            }
        })
    }
}