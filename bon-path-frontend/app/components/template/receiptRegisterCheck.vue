<template>
    <NuxtLayout name="app">
        <template #parallax>
            <OrganismReceiptRegisterCheckReceiptParallax 
                :receipt-image="data?.receipt.images[0]"
            />
        </template>
        <template #main>
            <OrganismReceiptRegisterCheckInformationArticle />
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
const { data, execute } = useReceiptRegisterCheckViewModel()
onMounted(async()=>await execute())

</script>

<style scoped>

</style>