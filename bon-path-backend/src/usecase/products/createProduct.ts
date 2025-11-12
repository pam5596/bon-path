import { ProductEntity } from "@models/entity";
import { ProductsPayloadSchemas } from "@payload";
import { ProductRepository, ProductVectorRepository } from "@repository";
import { ProductPayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class CreateProductUseCase implements BaseUseCase<
    ProductPayloads.POST.Request
>{
    constructor(
        public repositories: { 
            product: ProductRepository,
            productVector: ProductVectorRepository
        },
    ){}

    async execute(request: ProductsPayloadSchemas.POST.Request) {
        const body = request.toValueObjectBody()

        const product = new ProductEntity(body)
        const inserted_product = await this.repositories.product.insert(product)

        await this.repositories.productVector.insertMany([inserted_product])

        return new ProductsPayloadSchemas.POST.Response({
            body: {
                id: inserted_product.id!.value
            }
        })
    }
}