<template>
    <v-list-item>
        <AtomPurchaseHistoryReceiptProductImage 
            :src="props.purchase.product.getValues.image"
        />
        <AtomPurchaseHistoryReceiptProductName>
            {{ props.purchase.product.getValues.name }}
        </AtomPurchaseHistoryReceiptProductName>
        <MoleculePurchaseHistoryReceiptProductValues 
            :price="purchase.getValues.price"
            :quantity="purchase.getValues.quantity"
        />
    </v-list-item>
</template>

<script setup lang="ts">
const props = defineProps<{
    purchase: PurchaseModel
}>()

</script>

<style scoped>

</style>