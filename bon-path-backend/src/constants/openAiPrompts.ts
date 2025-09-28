import { ProductName, PurchasePrice, PurchaseQuantity, StoreName } from "@models/valueObject";
import z from "zod";

export const OPEN_AI_PROMPTS = {
    receiptOcr: {
        system: `
            You are an receipt OCR assistant.
            Extract text from each receipt image and return JSON only.

            store.name should include the store address.
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
    }
}