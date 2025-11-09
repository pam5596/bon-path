<template>
    <v-list-item>
        <MoleculeReceiptRegisterCheckProductSelector 
            :products="Array(10).fill(props.purchase.product)"
        />
        <MoleculeReceiptRegisterCheckProductValues 
            :purchase="props.purchase"
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