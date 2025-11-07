<template>
    <NuxtLayout name="app" :page-title="$t('purchaseHistoryStores.heading')">
        <template #main>
            <div class="contents">
                <OrganismPurchaseHistoryStoresListArticle />
            </div>
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">

</script>

<style scoped>
.contents {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>