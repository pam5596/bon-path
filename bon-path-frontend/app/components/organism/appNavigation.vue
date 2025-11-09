<template>
    <v-bottom-navigation
        v-model="value"
        mode="shift"
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
import { VBottomNavigation } from 'vuetify/components';

const value = ref(0)
console.log(VBottomNavigation.style)
</script>

<style scoped>

</style>