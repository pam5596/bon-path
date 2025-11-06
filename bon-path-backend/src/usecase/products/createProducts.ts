import { ProductEntity } from "@models/entity";
import { ProductsPayloadSchemas } from "@payload";
import { ProductRepository } from "@repository";
import { ProductPayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class CreateProductsUseCase implements BaseUseCase<
    ProductPayloads.POST.Request
>{
    constructor(
        public repositories: { product: ProductRepository },
    ){}

    async execute(request: ProductsPayloadSchemas.POST.Request) {
        const body = request.toValueObjectBody()

        const product = new ProductEntity(body)
        
        await this.repositories.product.insert(product)
    }
}