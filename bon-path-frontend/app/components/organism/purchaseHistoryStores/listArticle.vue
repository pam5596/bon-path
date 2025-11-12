<template>
    <div class="wrapper">
        <MoleculePurchaseHistoryStoresCard 
            v-for="(store, index) in data" 
            :key="index"
            :store="store"
            @to-receipts="toReceipts(store.id!)"
        />
    </div>
</template>

<script setup lang="ts">
const { data, execute, toReceipts } = usePurchaseHistoryStoresViewModel()
onMounted(async()=>await execute())

</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>