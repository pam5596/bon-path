import categoriesFixture from "@@/../share/fixtures/categories.json";
import productsFixture from "@@/../share/fixtures/products.json";
import purchasesFixture from "@@/../share/fixtures/purchases.json";
import receiptImagesFixture from "@@/../share/fixtures/receiptImages.json";
import receiptsFixture from "@@/../share/fixtures/receipts.json";
import storesFixture from "@@/../share/fixtures/stores.json";
import usersFixture from "@@/../share/fixtures/users.json";

export default function() {
    return {
        categoriesFixture,
        productsFixture,
        purchasesFixture,
        receiptImagesFixture: receiptImagesFixture.map(
            (image) => ({
                ...image,
                url: `/_nuxt/@fs/share/fixtures/images${image.url}`
            })
        ),
        receiptsFixture,
        storesFixture,
        usersFixture
    }
}