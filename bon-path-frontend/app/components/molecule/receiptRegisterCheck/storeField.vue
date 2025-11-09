<template>
    <div class="field">
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
.field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>