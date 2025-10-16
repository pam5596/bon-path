import { ProductsPayloadSchemas } from "@payload";
import { ProductRepository } from "@repository";
import { ProductPayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class DeleteProductUseCase implements BaseUseCase<
    ProductPayloads.DELETE.Request
>{
    constructor(
        public repositories: { product: ProductRepository },
    ) {}

    async execute(request: ProductsPayloadSchemas.DELETE.Request) {
        const params = request.toValueObjectParams()

        await this.repositories.product.deleteById(params.id)
    }
}