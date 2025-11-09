<template>
    <v-form class="wrapper">
        <MoleculeReceiptRegisterCheckStoreField />
        <v-divider />
        <MoleculeReceiptRegisterCheckProductsField />
        <v-btn color="primary">
            {{ $t("receiptRegisterCheck.form.onSubmitBtn") }}
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">

</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>