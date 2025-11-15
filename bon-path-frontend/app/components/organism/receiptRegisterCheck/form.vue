<template>
    <v-form 
        v-model="modelForm"
        class="wrapper"
    >
        <MoleculeReceiptRegisterCheckStoreField />
        <v-divider />
        <MoleculeReceiptRegisterCheckProductsField />
        <v-btn 
            color="primary"
            :loading="isSubmitting"
            :disabled="!modelForm"
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
const modelForm = ref(false)

</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>