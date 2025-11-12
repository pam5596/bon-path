<template>
    <div class="contents">
        <MoleculeDashboardReceiptCard
            v-for="(receipt, index) in props.receipts" 
            :key="index"
            :receipt="receipt"
            @click-delete-receipt="emit('click-delete-receipt', receipt.id!)"
            @click-navigate-to-check="emit('click-navigate-to-check', receipt.id!)"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    receipts?: ReceiptModel[]
}>()
const emit = defineEmits<{
    (e: 'click-delete-receipt' | 'click-navigate-to-check', id: number): void
}>()

</script>

<style scoped>
.contents {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>