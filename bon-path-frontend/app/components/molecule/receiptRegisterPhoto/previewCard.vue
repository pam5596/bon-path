<template>
    <v-card class="contents">
        <AtomReceiptRegisterPhotoTitle>
            {{ $t("receiptRegisterPhoto.previewCard.title") }}
        </AtomReceiptRegisterPhotoTitle>
        <MoleculeReceiptRegisterPhotoPreviewCardList 
            :image-urls="props.imageUrls"
        />
        <MoleculeReceiptRegisterPhotoPreviewCardActions 
            @click-save-receipt-and-check="emit('click-save-receipt-and-check')"
            @click-save-receipt="emit('click-save-receipt')"
        />
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
    imageUrls: string[],
}>()

const emit = defineEmits(['click-save-receipt', 'click-save-receipt-and-check'])
</script>

<style scoped>
.contents {
    display: flex;
    gap: 1rem;
    padding: 1rem;
}

</style>