<template>
    <div class="contents">
        <MoleculePurchaseHistoryReceiptsCard
            v-for="(receipt, index) in props.receipts" 
            :key="index"
            :receipt="receipt"
            @delete-receipt="onDeleteReceiptEvent(receipt.id!)"
            @to-receipt="toReceiptEvent(receipt.id!)"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    receipts?: ReceiptModel[]
}>()
const { onDeleteReceiptEvent, toReceiptEvent } = usePurchaseHistoryReceiptsViewModel()

</script>

<style scoped>
.contents {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>