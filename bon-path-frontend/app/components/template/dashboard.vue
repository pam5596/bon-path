<template>
    <NuxtLayout name="app" :page-title="$t('dashboard.heading')">
        <template #main>
            <div class="contents">
                <OrganismDashboardUserInfoSection />
                <OrganismDashboardUnCheckedReceiptsSection />
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