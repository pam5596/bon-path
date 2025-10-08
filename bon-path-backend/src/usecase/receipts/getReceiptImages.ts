import BaseUseCase from "@usecase/_interface";
import { ReceiptPayloads } from "@share/payloads";
import { ReceiptsPayloadSchemas } from "@payload";
import { HonoJwtClient } from "@client";
import { JWTPayload } from "hono/utils/jwt/types";
import { ReceiptImageRepository } from "@repository";
import { LoginSessionEntity } from "@models/entity";

export class GetReceiptImagesUsecase implements BaseUseCase<
    ReceiptPayloads.Images.GET.Request,
    ReceiptPayloads.Images.GET.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { receiptImage: ReceiptImageRepository },
        public request: ReceiptsPayloadSchemas.Images.GET.Request
    ) {}

    async execute() {
        await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        ) as LoginSessionEntity['toPrimitives'] & JWTPayload
        const params = this.request.toValueObjectParams()

        const images = await this.repositories.receiptImage.selectByReceiptId(params.receiptId);

        return new ReceiptsPayloadSchemas.Images.GET.Response({
            body: {
                images: images.map(
                    image => ({
                        id: image.id!.value,
                        createdAt: image.getCreatedAt!.value,
                        ...image.toPrimitives
                    })
                )
            }
        })
    }
}