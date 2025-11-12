<template>
    <article>
        <v-card class="wrapper">
            <AtomPurchaseHistoryReceiptStoreName>
                {{ props.store?.getValues.name }}
            </AtomPurchaseHistoryReceiptStoreName>
            <AtomPurchaseHistoryReceiptCreatedAt 
                :value="props.receipt?.getValues.createdAt"
            />
            <v-divider />
            <v-card-text>
                <MoleculePurchaseHistoryReceiptInfoProducts 
                    :purchases="props.purchases"
                />
            </v-card-text>
            <v-divider />
            <MoleculePurchaseHistoryReceiptInfoActions />
        </v-card>
    </article>
</template>

<script setup lang="ts">
const props = defineProps<{
    store?: StoreModel,
    receipt?: ReceiptModel,
    purchases?: PurchaseModel[]
}>()

</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
}
</style>