<template>
    <v-form class="form">
        <v-file-upload
            v-model="form"
            multiple
            clearable
            accept="image/*;capture=camera"
            :title="$t('receiptRegisterPhoto.uploadForm.placeholder')"
            density="compact"
            variant="compact"
            color="transparent"
            style="padding: 0.5rem;"
        />
        <v-btn 
            color="primary" 
            :disabled="!isSubmitAble"
            @click="onOpenDialogEvent"
        >
            {{ $t("receiptRegisterPhoto.uploadForm.onOpenDialogBtn") }}
        </v-btn>
        <MoleculeReceiptRegisterPhotoPreviewDialog 
            v-model="dialog"
            :image-urls="previewUrls"
            @click-save-receipt="onSaveReceiptEvent({ images: form, location: location! })"
            @click-save-receipt-and-check="onSaveReceiptAndCheckEvent({ images: form, location: location! })"
        />
    </v-form>
</template>

<script setup lang="ts">
const { 
    form, 
    location,
    previewUrls, 
    isSubmitAble, 
    dialog, 
    getLocation,
    onOpenDialogEvent,
    onSaveReceiptEvent,
    onSaveReceiptAndCheckEvent,
} = useReceiptRegisterPhotoViewModel()

onMounted(()=>getLocation())

</script>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>