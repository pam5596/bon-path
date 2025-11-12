<template>
    <v-bottom-navigation
        v-model="value"
        active
        grow
    >
        <AtomNavigationBtn 
            value="dashboard"
            mdi-icon="mdi-view-dashboard"
            :name="$t('appNavigation.toDashBoardBtn')"
            :to="'/dashboard'"
        />
        <AtomNavigationBtn 
            value="purchase-history"
            mdi-icon="mdi-store-marker"
            :name="$t('appNavigation.toPurchaseHistoryBtn')"
            :to="'/purchase-history/stores'"
        />
        <AtomNavigationBtn 
            value="receipt-register"
            mdi-icon="mdi-receipt-text-plus"
            :name="$t('appNavigation.toReceiptRegisterBtn')"
            :to="'/receipt-register/photo'"
        />
        <AtomNavigationBtn
            value="logout"
            mdi-icon="mdi-logout"
            :name="$t('appNavigation.signOutBtn')"
            @click-navigate="onSignoutEvent"
        />
    </v-bottom-navigation>
</template>

<script setup lang="ts">
const route = useRoute()
const value = ref(route.path.split('/')[1])

const { event: onSignoutEvent } = onSignout()

</script>

<style scoped>

</style>