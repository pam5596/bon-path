<template>
    <div v-for="(receipt, index) in props.receipts" :key="index">
        <MoleculePurchaseHistoryReceiptsCard :receipt="receipt" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    receipts: ReceiptModel[]
}>()
</script>

<style scoped>

</style>