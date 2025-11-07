<template>
    <div class="profile">
        <AtomPurchaseHistoryReceiptProductImage 
            :src="props.image"
        />
        <AtomPurchaseHistoryReceiptProductName>
            {{ props.name }}
        </AtomPurchaseHistoryReceiptProductName>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    image?: string;
    name: string;
}>()

</script>

<style scoped>
.profile {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}
</style>