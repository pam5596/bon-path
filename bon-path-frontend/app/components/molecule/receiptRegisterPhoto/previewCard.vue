<template>
    <v-card>
        <AtomReceiptRegisterPhotoTitle>
            {{ $t("receiptRegisterPhoto.previewCard.title") }}
        </AtomReceiptRegisterPhotoTitle>
        <v-card-text>
            <AtomReceiptRegisterPhotoAvatar />
            <AtomReceiptRegisterPhotoAvatar />
            <AtomReceiptRegisterPhotoAvatar />
        </v-card-text>
        <MoleculeReceiptRegisterPhotoPreviewCardActions />
    </v-card>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>