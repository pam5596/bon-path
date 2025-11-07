<template>
    <article>
        <v-card class="card">
            <AtomPurchaseHistoryReceiptStoreName>
                {{ store?.name }}
            </AtomPurchaseHistoryReceiptStoreName>
            <AtomPurchaseHistoryReceiptCreatedAt>
                {{ new Date().toLocaleString() }}
            </AtomPurchaseHistoryReceiptCreatedAt>
            <v-divider />
            <v-card-text>
                <MoleculePurchaseHistoryReceiptInfoProducts :purchases="purchases"/>
            </v-card-text>
            <v-divider />
            <MoleculePurchaseHistoryReceiptInfoActions />
        </v-card>
    </article>
</template>

<script setup lang="ts">
const { storesFixture, purchasesFixture, productsFixture } = useFixtures()
const { storeId } = useIdParams(['storeId', 'receiptId'])

const store = computed(() => storesFixture.find(
    (store) => store.id == storeId
))
const purchases = computed(() => purchasesFixture.map(
    (purchase) => new PurchaseModel({
        ...purchase,
        product: new ProductModel({
            ...productsFixture.find(
                (product) => purchase.productId == product.id
            )!
        })
    })
))

</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
}
</style>