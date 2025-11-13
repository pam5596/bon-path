<template>
    <v-list class="contents">
        <MoleculeReceiptRegisterCheckDescriptionListItem 
            :description="$t('receiptRegisterCheck.description.whenErrorRaised')"
        />
        <MoleculeReceiptRegisterCheckDescriptionListItem 
            :description="$t('receiptRegisterCheck.description.disturbingKatakana')"
        />
        <MoleculeReceiptRegisterCheckDescriptionListItem 
            :description="$t('receiptRegisterCheck.description.wrongReadProduct')"
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