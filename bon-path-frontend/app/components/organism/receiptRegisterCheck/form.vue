<template>
    <v-form class="wrapper">
        <MoleculeReceiptRegisterCheckStoreField />
        <v-divider />
        <MoleculeReceiptRegisterCheckProductsField />
        <v-btn 
            color="primary"
            :loading="isSubmitting"
            @click="onSavePurchasesEvent"
        >
            {{ $t("receiptRegisterCheck.form.onSubmitBtn") }}
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">
const {
    isSubmitting,
    onSavePurchasesEvent 
} = useReceiptRegisterCheckViewModel()

</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>