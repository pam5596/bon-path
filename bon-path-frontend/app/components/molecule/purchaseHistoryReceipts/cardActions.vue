<template>
    <v-card-actions class="actions">
        <v-btn color="primary" variant="flat" width="70%">
            {{ $t("purchaseHistoryReceipts.cardActions.toReceiptBtn") }}
        </v-btn>
        <v-btn color="error" variant="outlined" width="70%">
            {{ $t("purchaseHistoryReceipts.cardActions.onDeleteBtn") }}
        </v-btn>
    </v-card-actions>
</template>

<script setup lang="ts">

</script>

<style scoped>
.actions {
    flex-direction: column;
    align-items: end;
}
</style>