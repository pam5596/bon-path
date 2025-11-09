<template>
    <div class="contents">
        <AtomTypography class="text-h6">
            {{ $t("receiptRegisterCheck.form.storeHeading") }}
        </AtomTypography>
        <MoleculeReceiptRegisterCheckStoreSelector 
            :stores="stores"
        />
    </div>
</template>

<script setup lang="ts">
const { storesFixture } = useFixtures()

const stores = computed(()=> storesFixture.map(
    store => new StoreModel(store)
))
</script>

<style scoped>
.contents {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>