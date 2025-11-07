<template>
    <v-bottom-navigation>
        <AtomNavigationBtn>
            {{ $t("appNavigation.toDashBoardBtn") }}
        </AtomNavigationBtn>
        <AtomNavigationBtn>
            {{ $t("appNavigation.toPurchaseHistoryBtn") }}
        </AtomNavigationBtn>
        <AtomNavigationBtn>
            {{ $t("appNavigation.toReceiptRegisterBtn") }}
        </AtomNavigationBtn>
        <AtomNavigationBtn>
            {{ $t("appNavigation.signOutBtn") }}
        </AtomNavigationBtn>
    </v-bottom-navigation>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>