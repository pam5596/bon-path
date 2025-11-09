<template>
    <v-list class="list">
        <MoleculeReceiptRegisterCheckProductListItem 
            v-for="(purchase, index) in props.purchases" 
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
.list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>