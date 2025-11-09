<template>
    <div class="contents">
        <AtomTypography class="text-h6">
            {{  $t("receiptRegisterCheck.form.productsHeading") }}
        </AtomTypography>
        <MoleculeReceiptRegisterCheckProductsList 
            :purchases="purchases"
        />
    </div>
</template>

<script setup lang="ts">
const { purchasesFixture, productsFixture } = useFixtures()
const { receiptId } = useIdParams(['receiptId'])

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
.contents {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>