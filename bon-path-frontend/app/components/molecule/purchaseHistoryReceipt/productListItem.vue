<template>
    <v-list-item>
        <div class="contents">
            <AtomPurchaseHistoryReceiptProductImage 
                :src="props.purchase.product.getValues.image"
            />
            <AtomPurchaseHistoryReceiptProductName>
                {{ props.purchase.product.getValues.name }}
            </AtomPurchaseHistoryReceiptProductName>
            <MoleculePurchaseHistoryReceiptProductValues 
                :price="props.purchase.getValues.price"
                :quantity="props.purchase.getValues.quantity"
            />
        </div>
    </v-list-item>
</template>

<script setup lang="ts">
const props = defineProps<{
    purchase: PurchaseModel
}>()

</script>

<style scoped>
.contents {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}
</style>