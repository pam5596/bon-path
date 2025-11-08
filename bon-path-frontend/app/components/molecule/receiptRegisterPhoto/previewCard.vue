<template>
    <v-card class="card">
        <AtomReceiptRegisterPhotoTitle>
            {{ $t("receiptRegisterPhoto.previewCard.title") }}
        </AtomReceiptRegisterPhotoTitle>
        <MoleculeReceiptRegisterPhotoPreviewCardList 
            :image-urls="props.imageUrls"
        />
        <MoleculeReceiptRegisterPhotoPreviewCardActions />
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
    imageUrls: string[]
}>()
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}

</style>