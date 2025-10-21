import BaseUseCase from "@usecase/_interface";
import { ReceiptPayloads } from "@share/payloads";
import { ReceiptsPayloadSchemas } from "@payload";
import { ReceiptImageRepository } from "@repository";

export class GetReceiptImagesUsecase implements BaseUseCase<
    ReceiptPayloads.Images.GET.Request,
    ReceiptPayloads.Images.GET.Response
> {
    constructor(
        public repositories: { receiptImage: ReceiptImageRepository },
    ) {}

    async execute(request: ReceiptsPayloadSchemas.Images.GET.Request) {
        const params = request.toValueObjectParams()

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