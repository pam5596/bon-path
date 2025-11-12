<template>
    <div class="contents">
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
.contents {
    display: flex;
    flex-direction: column;
    margin-left: auto;
}
</style>