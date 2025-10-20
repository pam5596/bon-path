import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";
import { PrismaClient } from "@client";

import user_fixtures from "@share/fixtures/users.json";
import receipt_fixtures from "@share/fixtures/receipts.json";
import receipt_image_fixtures from "@share/fixtures/receiptImages.json";
import store_fixtures from "@share/fixtures/stores.json";
import category_fixtures from "@share/fixtures/categories.json";
import product_fixtures from "@share/fixtures/products.json";
import purchase_fixtures from "@share/fixtures/purchases.json";

export function withTestFixtures(
    client: PrismaClient,
    checkDBAfterAll: boolean
) {
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
            await client.$executeRawUnsafe(`
                SELECT setval(
                    pg_get_serial_sequence('"User"', 'id'),
                    COALESCE((SELECT MAX(id) FROM "User"), 0) + 1,
                    false
                );
            `);


            await client.receipt.createMany({ data: receipt_fixtures })
            await client.$executeRawUnsafe(`
                SELECT setval(
                    pg_get_serial_sequence('"Receipt"', 'id'),
                    COALESCE((SELECT MAX(id) FROM "Receipt"), 0) + 1,
                    false
                );
            `);
            
            await client.receiptImage.createMany({ data: receipt_image_fixtures })
            await client.$executeRawUnsafe(`
                SELECT setval(
                    pg_get_serial_sequence('"ReceiptImage"', 'id'),
                    COALESCE((SELECT MAX(id) FROM "ReceiptImage"), 0) + 1,
                    false
                );
            `);


            await client.store.createMany({ data: store_fixtures })
            await client.$executeRawUnsafe(`
                SELECT setval(
                    pg_get_serial_sequence('"Store"', 'id'),
                    COALESCE((SELECT MAX(id) FROM "Store"), 0) + 1,
                    false
                );
            `);
            
            await client.category.createMany({ data: category_fixtures })
            await client.$executeRawUnsafe(`
                SELECT setval(
                    pg_get_serial_sequence('"Category"', 'id'),
                    COALESCE((SELECT MAX(id) FROM "Category"), 0) + 1,
                    false
                );
            `);

            await client.product.createMany({ data: product_fixtures })
            await client.$executeRawUnsafe(`
                SELECT setval(
                    pg_get_serial_sequence('"Product"', 'id'),
                    COALESCE((SELECT MAX(id) FROM "Product"), 0) + 1,
                    false
                );
            `);
            
            await client.purchase.createMany({ data: purchase_fixtures })
            await client.$executeRawUnsafe(`
                SELECT setval(
                    pg_get_serial_sequence('"Purchase"', 'id'),
                    COALESCE((SELECT MAX(id) FROM "Purchase"), 0) + 1,
                    false
                );
            `);
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

    if (!checkDBAfterAll)
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