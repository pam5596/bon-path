<template>
    <v-form class="form">
        <!-- <v-file-input
            prepend-icon="mdi-receipt-send"
            accept="image/*"
            chips
            multiple
            :placeholder="$t('receiptRegisterPhoto.uploadForm.placeholder')"
            variant="outlined"
        /> -->
        <v-file-upload
            multiple
            accept="image/*"
            :title="$t('receiptRegisterPhoto.uploadForm.placeholder')"
            density="compact"
            variant="compact"
            color="transparent"
            style="padding: 0.5rem;"
        />
        <v-btn color="primary">
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