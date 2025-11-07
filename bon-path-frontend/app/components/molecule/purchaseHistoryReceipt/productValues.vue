<template>
    <div class="values">
        <AtomPurchaseHistoryReceiptProductPrice :value="props.price" />
        <AtomPurchaseHistoryReceiptProductQuantity :value="props.quantity" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    price: number,
    quantity: number
}>()

</script>

<style scoped>
.values {
    display: flex;
    flex-direction: column;
}
</style>