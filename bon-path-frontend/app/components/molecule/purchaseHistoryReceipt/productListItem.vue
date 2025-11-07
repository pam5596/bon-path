<template>
    <v-list-item>
        <MoleculePurchaseHistoryReceiptProductProfile 
            :image="props.purchase.product.getValues.image"
            :name="props.purchase.product.getValues.name"
        />
        <MoleculePurchaseHistoryReceiptProductValues 
            :price="props.purchase.getValues.price"
            :quantity="props.purchase.getValues.quantity"
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