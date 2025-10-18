import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";
import { PrismaClient } from "@client";

import user_fixtures from "@share/fixtures/users.json";
import receipt_fixtures from "@share/fixtures/receipts.json";
import receipt_image_fixtures from "@share/fixtures/receiptImages.json";
import store_fixtures from "@share/fixtures/stores.json";
import category_fixtures from "@share/fixtures/categories.json";
import product_fixtures from "@share/fixtures/products.json";
import purchase_fixtures from "@share/fixtures/purchases.json";

export function withTestFixtures(client: PrismaClient) {
    beforeAll(
        async () => {
            await client.$executeRawUnsafe(`
                TRUNCATE TABLE
                    "User", 
                    "Receipt", 
                    "ReceiptImage", 
                    "Store",
                    "Category",
                    "Product",
                    "Purchase",
                    "StoreVector",
                    "ProductVector"
                RESTART IDENTITY CASCADE;
            `)
            await client.user.createMany({ data: user_fixtures })
            await client.receipt.createMany({ data: receipt_fixtures })
            await client.receiptImage.createMany({ data: receipt_image_fixtures })
            await client.store.createMany({ data: store_fixtures })
            await client.category.createMany({ data: category_fixtures })
            await client.product.createMany({ data: product_fixtures })
            await client.purchase.createMany({ data: purchase_fixtures })
        }
    )

    beforeEach(
        async () => {
            await client.$executeRaw`BEGIN`;
        }
    )

    afterEach(
        async () => {
            await client.$executeRaw`ROLLBACK`;
        }
    )

    afterAll(
        async () => {
            await client.$executeRawUnsafe(`
                TRUNCATE TABLE
                    "User", 
                    "Receipt", 
                    "ReceiptImage", 
                    "Store",
                    "Category",
                    "Product",
                    "Purchase",
                    "StoreVector",
                    "ProductVector"
                RESTART IDENTITY CASCADE;
            `)
        }
    )
}