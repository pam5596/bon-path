<template>
    <v-form class="wrapper">
        <MoleculeReceiptRegisterCheckStoreField 
            :stores="stores"
        />
        <v-divider />
        <MoleculeReceiptRegisterCheckProductsField 
            :purchases="purchases"
        />
        <v-btn color="primary">
            {{ $t("receiptRegisterCheck.form.onSubmitBtn") }}
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">
const { purchasesFixture, productsFixture, storesFixture } = useFixtures()
const { receiptId } = useIdParams(['receiptId'])

const stores = computed(()=> storesFixture.map(
    store => new StoreModel(store)
))

const purchases = computed(()=> purchasesFixture.filter(
    purchase => purchase.receiptId == receiptId
).map(
    purchase => new PurchaseModel({
        ...purchase,
        product: new ProductModel(
        productsFixture.find(product => product.id == purchase.productId)!
    )
    })
))
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>