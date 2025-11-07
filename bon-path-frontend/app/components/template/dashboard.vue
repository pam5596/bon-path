<template>
    <NuxtLayout name="app" :page-title="$t('dashboard.heading')">
        <template #main>
            <OrganismDashboardUserInfoSection />
            <OrganismDashboardUnCheckedReceiptsSection />
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>