<template>
    <v-list-item-subtitle>
        {{ $t("purchaseHistoryReceipt.productValues.quantityUnit") + props.value }}
    </v-list-item-subtitle>
</template>

<script setup lang="ts">
const props = defineProps<{
    value: number
}>()
</script>

<style scoped>

</style>