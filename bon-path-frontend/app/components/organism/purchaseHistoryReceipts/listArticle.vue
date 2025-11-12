<template>
    <article>
        <AtomTypography class="store-name">
            {{ props.store?.getValues.name }}
        </AtomTypography>
        <MoleculePurchaseHistoryReceiptsList 
            :receipts="props.receipts"
        />
    </article>
</template>

<script setup lang="ts">
const props = defineProps<{
    store?: StoreModel,
    receipts?: ReceiptModel[]
}>()

</script>

<style scoped>
article {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.store-name {
    font-size: 1.25rem;
}
</style>