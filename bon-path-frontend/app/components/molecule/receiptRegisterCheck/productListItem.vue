<template>
    <v-list-item>
        <AtomReceiptRegisterCheckProductImage 
            :src="props.purchase.product.getValues.image"
        />
        <MoleculeReceiptRegisterCheckProductSelector />
        <v-text-field>{{ purchase.getValues.price }}</v-text-field>
        <v-text-field>{{ purchase.getValues.quantity }}</v-text-field>
    </v-list-item>
</template>

<script setup lang="ts">
const props = defineProps<{
    purchase: PurchaseModel
}>()
</script>

<style scoped>

</style>