<template>
    <v-list class="contents">
        <MoleculePurchaseHistoryReceiptProductListItem 
            v-for="(purchase, index) in props.purchases"
            :key="index"
            :purchase="purchase"
        />
    </v-list>
</template>

<script setup lang="ts">
const props = defineProps<{
    purchases?: PurchaseModel[]
}>()

</script>

<style scoped>
.contents {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>