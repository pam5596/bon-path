<template>
    <v-form>
        <div>
            <AtomTypography>
                {{ $t("receiptRegisterCheck.form.storeHeading") }}
            </AtomTypography>
            <AtomReceiptRegisterCheckStoreImage 
                :src="stores[0]?.getValues.image!"
            />
            <MoleculeReceiptRegisterCheckStoreSelector />
        </div>
        <v-divider />
        <div>
            <AtomTypography>
                {{  $t("receiptRegisterCheck.form.productsHeading") }}
            </AtomTypography>
            <MoleculeReceiptRegisterCheckProductsList 
                :purchases="purchases"
            />
        </div>
        <v-btn>
            {{ $t("receiptRegisterCheck.form.onSubmitBtn") }}
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">
const { storesFixture, purchasesFixture, productsFixture } = useFixtures()
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

</style>