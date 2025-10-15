import { HonoJwtClient } from "@client";
import { ProductEntity } from "@models/entity";
import { ProductsPayloadSchemas } from "@payload";
import { ProductRepository } from "@repository";
import { ProductPayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class CreateProductsUseCase implements BaseUseCase<
    ProductPayloads.POST.Request
>{
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { product: ProductRepository },
    ){}

    async execute(request: ProductsPayloadSchemas.POST.Request) {
        await this.clients.honoJwt.verify(
            request.getCookies.loginSessionId
        )
        const body = request.toValueObjectBody()

        const products = body.products.map(
            product => new ProductEntity(product)
        )
        await this.repositories.product.insertMany(products)
    }
}