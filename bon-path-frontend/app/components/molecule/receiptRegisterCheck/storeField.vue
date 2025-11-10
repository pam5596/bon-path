<template>
    <div class="contents">
        <AtomTypography class="text-h6">
            {{ $t("receiptRegisterCheck.form.storeHeading") }}
        </AtomTypography>
        <MoleculeReceiptRegisterCheckStoreSelector 
            :stores="props.stores"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    stores: StoreModel[]
}>()

</script>

<style scoped>
.contents {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>