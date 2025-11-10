<template>
    <div class="contents">
        <AtomTypography class="text-h6">
            {{  $t("receiptRegisterCheck.form.productsHeading") }}
        </AtomTypography>
        <MoleculeReceiptRegisterCheckProductsList 
            :purchases="props.purchases"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    purchases: PurchaseModel[]
}>()

</script>

<style scoped>
.contents {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>