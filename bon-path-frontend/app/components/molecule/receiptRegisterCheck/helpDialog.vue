<template>
    <v-dialog v-model="model">
        <template #default="{ isActive }">
            <v-card class="contents">
                <v-card-title>
                    ヘルプ
                </v-card-title>
                <v-card-text>
                    <v-list class="list">
                        <MoleculeReceiptRegisterCheckHelpListItem>
                            {{ $t('receiptRegisterCheck.help.howToPreviewReceipt-before') }}
                            <v-icon>mdi-image</v-icon>
                            {{ $t('receiptRegisterCheck.help.howToPreviewReceipt-after') }}
                        </MoleculeReceiptRegisterCheckHelpListItem>
                        <MoleculeReceiptRegisterCheckHelpListItem>
                            {{ $t('receiptRegisterCheck.help.noProductImage-before') }}
                            <v-icon>mdi-image-search</v-icon>
                            {{ $t('receiptRegisterCheck.help.noProductImage-after') }}
                        </MoleculeReceiptRegisterCheckHelpListItem> 
                        <MoleculeReceiptRegisterCheckHelpListItem>
                            {{ $t('receiptRegisterCheck.help.dontForgetProductName') }}
                        </MoleculeReceiptRegisterCheckHelpListItem>
                    </v-list>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        variant="flat"
                        color="primary"
                        @click="isActive.value = false"
                    >
                        OK
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script setup lang="ts">
const model = defineModel<boolean>()
</script>

<style scoped>
.contents {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>