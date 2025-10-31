<template>
    <article>
        <v-card>
            <AtomPurchaseHistoryReceiptStoreName />
            <AtomPurchaseHistoryReceiptPurchasedAt />
            <v-divider />
            <v-card-text>
                <MoleculePurchaseHistoryReceiptInfoProducts />
            </v-card-text>
            <v-divider />
            <v-card-text>
                <MoleculePurchaseHistoryReceiptInfoTotal />
            </v-card-text>
            <MoleculePurchaseHistoryReceiptInfoActions />
        </v-card>
    </article>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>