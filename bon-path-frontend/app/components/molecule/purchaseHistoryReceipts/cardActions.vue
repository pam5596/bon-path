<template>
    <v-card-actions class="actions">
        <v-btn>
            {{ $t("purchaseHistoryReceipts.cardActions.toReceiptBtn") }}
        </v-btn>
        <v-btn>
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