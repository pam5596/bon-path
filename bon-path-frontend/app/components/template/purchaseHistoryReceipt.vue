<template>
    <NuxtLayout name="app">
        <template #parallax>
            <OrganismPurchaseHistoryReceiptParallax 
                :src="data?.receipt.images[0]?.getValues.url"
            />
        </template>
        <template #main>
            <OrganismPurchaseHistoryReceiptInformationArticle 
                :store="data?.store"
                :receipt="data?.receipt"
                :purchases="data?.purchases"
            />
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
const { data, execute } = renderPurchaseHistoryReceipt()
onMounted(async()=>await execute())

</script>

<style scoped>

</style>