<template>
    <v-form class="form">
        <v-file-input 
            prepend-icon="mdi-receipt-send"
            accept="image/*"
            chips
            multiple
        />
        <v-btn>
            {{ $t("receiptRegisterPhoto.uploadForm.onOpenDialogBtn") }}
        </v-btn>
        <MoleculeReceiptRegisterPhotoPreviewDialog />
    </v-form>
</template>

<script setup lang="ts">

</script>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>