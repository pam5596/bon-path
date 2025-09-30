import { GoogleSearchAPIClient } from "@client";
import BaseService from "./_interface";
import { ProductImage, ProductLink, ProductName } from "@models/valueObject";
import { ServiceError } from "@error";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export class SearchProductService implements BaseService {
    constructor(
        public client: GoogleSearchAPIClient
    ){}

    async execute(request: ProductName): Promise<{ 
        name: ProductName, 
        image?: ProductImage,
        link?: ProductLink
    }[]> {
        const response = await this.client.searchImages(request.value)

        if (!response.data.items) throw new ServiceError(
            ERROR_MESSAGES.service.searchProduct.detail,
            ERROR_MESSAGES.service.searchProduct.issue,
            this.constructor.name,
            request
        )

        return response.data.items
            .filter((item) => item.title)
            .map((item) => {
                return {
                    name: new ProductName(item.title!),
                    image: item.image?.thumbnailLink ? new ProductImage(item.image.thumbnailLink) : undefined,
                    link: item.image?.contextLink ? new ProductLink(item.image.contextLink) : undefined
                }
            })
    }
}