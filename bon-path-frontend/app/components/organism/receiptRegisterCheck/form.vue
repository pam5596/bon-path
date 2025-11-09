<template>
    <v-form class="form">
        <MoleculeReceiptRegisterCheckStoreField />
        <v-divider />
        <MoleculeReceiptRegisterCheckProductsField />
        <v-btn>
            {{ $t("receiptRegisterCheck.form.onSubmitBtn") }}
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">

</script>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>