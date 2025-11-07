<template>
    <v-bottom-navigation
        v-model="value"
        active
        grow
    >
        <AtomNavigationBtn 
            mdi-icon="mdi-view-dashboard"
            :name="$t('appNavigation.toDashBoardBtn')"
        />
        <AtomNavigationBtn 
            mdi-icon="mdi-store-marker"
            :name="$t('appNavigation.toPurchaseHistoryBtn')"
        />
        <AtomNavigationBtn 
            mdi-icon="mdi-receipt-text-plus"
            :name="$t('appNavigation.toReceiptRegisterBtn')"
        />
        <AtomNavigationBtn 
            mdi-icon="mdi-logout"
            :name="$t('appNavigation.signOutBtn')"
        />
    </v-bottom-navigation>
</template>

<script setup lang="ts">
const value = ref(0)

</script>

<style scoped>

</style>