<template>
    <v-list>
        <MoleculeReceiptRegisterPhotoDescriptionListItem 
            :description="$t('receiptRegisterPhoto.descriptionArticle.description.allowGeoLocation')"
        />
        <MoleculeReceiptRegisterPhotoDescriptionListItem 
            :description="$t('receiptRegisterPhoto.descriptionArticle.description.numberOfRegistration')"
        />
        <MoleculeReceiptRegisterPhotoDescriptionListItem 
            :description="$t('receiptRegisterPhoto.descriptionArticle.description.splitShooting')"
        />
        <MoleculeReceiptRegisterPhotoDescriptionListItem 
            :description="$t('receiptRegisterPhoto.descriptionArticle.description.photoConditions')"
        />
        <MoleculeReceiptRegisterPhotoDescriptionListItem 
            :description="$t('receiptRegisterPhoto.descriptionArticle.description.receiptCondition')"
        />
    </v-list>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>