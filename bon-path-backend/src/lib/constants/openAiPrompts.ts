import { Id, ProductName, PurchasePrice, PurchaseQuantity, StoreName } from "@models/valueObject";
import { z } from "zod";

export const OPEN_AI_PROMPTS = {
    receiptOcr: {
        system: `
            You are an receipt OCR assistant.
            Extract text from each receipt image and return JSON only.
            
            The price of the product should be per item.
            The store name should include the store place address.
            Does not include "合計", "小計", and "消費税".
            {format_instructions}
        `,
        human: "Analyze these receipt images.",
        zodSchema: z.object({
            store: z.object({
                name: StoreName.schema().describe('store name and address')
            }),
            products: z.array(
                z.object({
                    name: ProductName.schema().describe('Name of products purchased'),
                    price: PurchasePrice.schema().describe('Price of products purchased'),
                    quantity: PurchaseQuantity.schema().describe('Number of products purchased'),
                }).describe('information per product')
            )
        })
    },
    productNameExtract: {
        system: `
            Extract the product name from website title.
            Including weight and brand name.
            And categorize the product into one of the following categories from the website title.
            Return the extracted name and id of category to JSON.

            [categories]
            {categories}

            [output json schema]
            {format_instructions}
        `,
        human: "WebsiteTitles: {query}",
        zodSchema: z.object({
            name: ProductName.schema().describe('Product Name from website title'),
            categoryId: Id.schema().describe('Id number of category')
        })
    },
}