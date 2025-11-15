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
const { data, form, execute } = useReceiptRegisterCheckViewModel()
onMounted(async()=>await execute())
watch(data, 
    async (data) => {
        form.value.store = data?.store
        form.value.purchases = data?.purchases || []
    },
)


</script>

<style scoped>

</style>