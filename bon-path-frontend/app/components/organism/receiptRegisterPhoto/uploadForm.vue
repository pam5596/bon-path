<template>
    <v-form class="form">
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
        <MoleculeReceiptRegisterPhotoPreviewDialog 
            :image-urls="imageUrls"
        />
    </v-form>
</template>

<script setup lang="ts">
const { receiptImagesFixture } = useFixtures()
const imageUrls = computed(() => receiptImagesFixture.map(
    image => image.url
))

</script>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>