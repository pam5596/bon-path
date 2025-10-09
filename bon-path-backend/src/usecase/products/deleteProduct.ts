import { HonoJwtClient } from "@client";
import { ProductsPayloadSchemas } from "@payload";
import { ProductRepository } from "@repository";
import { ProductPayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class DeleteProductUseCase implements BaseUseCase<
    ProductPayloads.DELETE.Request
>{
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { product: ProductRepository },
        public request: ProductsPayloadSchemas.DELETE.Request
    ) {}

    async execute() {
        await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        )
        const params = this.request.toValueObjectParams()

        await this.repositories.product.deleteById(params.id)
    }
}