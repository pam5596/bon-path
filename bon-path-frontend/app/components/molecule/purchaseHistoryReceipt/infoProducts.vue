<template>
    <v-list v-for="(purchase, index) in props.purchases" :key="index">
        <MoleculePurchaseHistoryReceiptProductListItem 
            :key="index"
            :purchase="purchase"
        />
    </v-list>
</template>

<script setup lang="ts">
const props = defineProps<{
    purchases: PurchaseModel[]
}>()

</script>

<style scoped>

</style>