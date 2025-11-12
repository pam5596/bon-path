<template>
    <v-list class="contents">
        <MoleculeReceiptRegisterPhotoDescriptionListItem 
            :description="$t('receiptRegisterPhoto.descriptionArticle.description.allowGeoLocation')"
        />
        <MoleculeReceiptRegisterPhotoDescriptionListItem 
            :description="$t('receiptRegisterPhoto.descriptionArticle.description.numberOfRegistration')"
        />
        <MoleculeReceiptRegisterPhotoDescriptionListItem 
            :description="$t('receiptRegisterPhoto.descriptionArticle.description.rangeOfReceipt')"
        />
        <MoleculeReceiptRegisterPhotoDescriptionListItem 
        :description="$t('receiptRegisterPhoto.descriptionArticle.description.photoConditions')"
        />
        <MoleculeReceiptRegisterPhotoDescriptionListItem 
            :description="$t('receiptRegisterPhoto.descriptionArticle.description.splitShooting')"
        />
        <MoleculeReceiptRegisterPhotoDescriptionListItem 
            :description="$t('receiptRegisterPhoto.descriptionArticle.description.errorHandle')"
        />
    </v-list>
</template>

<script setup lang="ts">

</script>

<style scoped>
.contents {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>