<template>
    <v-card class="content">
        <v-avatar class="avatar">
            <AtomPurchaseHistoryReceiptsImage 
                :src="props.receipt.images[0]!.getValues.url"
            />
        </v-avatar>
        <v-card-item class="item">
            <AtomPurchaseHistoryReceiptsCreatedAt 
                :value="props.receipt.getValues.createdAt"
            />
            <MoleculePurchaseHistoryReceiptsCardActions 
                @to-receipt="emit('to-receipt')"
                @delete-receipt="emit('delete-receipt')"
            />
        </v-card-item>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
    receipt: ReceiptModel
}>()

const emit = defineEmits(['delete-receipt', 'to-receipt'])
</script>

<style scoped>
.content {
    height: 8rem;
    display: flex;
    flex-direction: row;
}

.avatar {
    height: auto;
    object-fit: cover;
    border-radius: 0;
    width: 30%;
}

.item {
    width: 70%;
    padding: 0.5rem;
}
</style>