<template>
    <v-card-actions class="contents">
        <v-btn color="error" variant="outlined" @click="onDeleteReceiptEvent">
            {{ $t("purchaseHistoryReceipt.infoActions.onDeleteBtn") }}
        </v-btn>
    </v-card-actions>
</template>

<script setup lang="ts">
const { onDeleteReceiptEvent } = usePurchaseHistoryReceiptViewModel()
</script>

<style scoped>
.contents {
    flex-direction: column;
    align-items: end;
}
</style>