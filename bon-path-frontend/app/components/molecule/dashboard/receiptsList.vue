<template>
    <div class="contents">
        <MoleculeDashboardReceiptCard
            v-for="(receipt, index) in props.receipts" 
            :key="index"
            :receipt="receipt"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    receipts?: ReceiptModel[]
}>()

</script>

<style scoped>
.contents {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>