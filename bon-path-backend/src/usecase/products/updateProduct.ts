import { HonoJwtClient } from "@client";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { UseCaseError } from "@lib/error";
import { ProductEntity } from "@models/entity";
import { ProductsPayloadSchemas } from "@payload";
import { ProductRepository } from "@repository";
import { ProductPayloads } from "@share/payloads";
import BaseUseCase from "@usecase/_interface";

export class UpdateProductUseCase implements BaseUseCase<
    ProductPayloads.PATCH.Request
>{
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { product: ProductRepository },
    ){}

    async execute(request: ProductsPayloadSchemas.PATCH.Request) {
        await this.clients.honoJwt.verify(
            request.getCookies.loginSessionId
        )
        const params = request.toValueObjectParams()
        const body = request.toValueObjectBody()

        const product = await this.repositories.product.selectById(params.id)
        if (!product) throw new UseCaseError(
            404,
            ERROR_MESSAGES.usecase.productNotFound.detail,
            ERROR_MESSAGES.usecase.productNotFound.issues,
            this.constructor.name,
            request.getParams
        )

        product.newValues = body
        await this.repositories.product.update(product)
    }
}