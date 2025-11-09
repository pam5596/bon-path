<template>
    <v-list-item-subtitle class="content">
        {{ $t("purchaseHistoryReceipt.productValues.quantityUnit") + props.value }}
    </v-list-item-subtitle>
</template>

<script setup lang="ts">
const props = defineProps<{
    value: number
}>()
</script>

<style scoped>
.content {
    text-align: end;
}
</style>