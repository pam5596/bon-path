<template>
    <v-list class="contents">
        <MoleculeReceiptRegisterCheckDescriptionListItem>
            {{ $t('receiptRegisterCheck.description.howToPreviewReceipt') }}
        </MoleculeReceiptRegisterCheckDescriptionListItem>
        <MoleculeReceiptRegisterCheckDescriptionListItem>
            {{ $t('receiptRegisterCheck.description.noProductImage-before') }}
            <v-icon>mdi-image-search</v-icon>
            {{ $t('receiptRegisterCheck.description.noProductImage-after') }}
        </MoleculeReceiptRegisterCheckDescriptionListItem> 
        <MoleculeReceiptRegisterCheckDescriptionListItem>
            {{ $t('receiptRegisterCheck.description.dontForgetProductName') }}
        </MoleculeReceiptRegisterCheckDescriptionListItem>
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