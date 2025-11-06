<template>
    <v-card>
        <AtomReceiptRegisterPhotoTitle>
            {{ $t("receiptRegisterPhoto.previewCard.title") }}
        </AtomReceiptRegisterPhotoTitle>
        <v-card-text v-for="(url, index) in props.imageUrls" :key="index">
            <AtomReceiptRegisterPhotoAvatar 
                :src="url"
            />
        </v-card-text>
        <MoleculeReceiptRegisterPhotoPreviewCardActions />
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
    imageUrls: string[]
}>()
</script>

<style scoped>

</style>