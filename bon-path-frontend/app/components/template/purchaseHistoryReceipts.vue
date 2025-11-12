<template>
    <NuxtLayout name="app">
        <template #parallax>
            <OrganismPurchaseHistoryReceiptsStoreParallax 
                :src="data?.store.getValues.image"
            />
        </template>
        <template #main>
            <OrganismPurchaseHistoryReceiptsListArticle 
                :store="data?.store"
                :receipts="data?.receipts"
            />
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
const { data, execute } = usePurchaseHistoryReceiptsViewModel()
onMounted(async()=>await execute())

</script>

<style scoped>

</style>