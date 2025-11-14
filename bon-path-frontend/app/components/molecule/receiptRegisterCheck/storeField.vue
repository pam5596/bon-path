<template>
    <div class="contents">
        <AtomTypography class="text-h6">
            {{ $t("receiptRegisterCheck.form.storeHeading") }}
        </AtomTypography>
        <MoleculeReceiptRegisterCheckStoreSelector />
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.contents {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>