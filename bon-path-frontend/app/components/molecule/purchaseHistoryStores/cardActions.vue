<template>
    <v-card-actions class="contents">
        <v-btn color="primary" variant="flat" @click="emit('to-receipts')">
            {{  $t("purchaseHistoryStores.cardActions.toReceiptsBtn") }}
        </v-btn>
    </v-card-actions>
</template>

<script setup lang="ts">
const emit = defineEmits(['to-receipts'])
</script>

<style scoped>
.contents {
    flex-direction: column;
    align-items: end;
}
</style>