<template>
    <v-card class="contents">
        <v-avatar class="avatar">
            <AtomPurchaseHistoryReceiptsImage 
                :src="props.receipt.images[0]!.getValues.url"
            />
        </v-avatar>
        <v-card-item class="item">
            <AtomPurchaseHistoryReceiptsCreatedAt 
                :value="new Date()"
            />
            <MoleculePurchaseHistoryReceiptsCardActions />
        </v-card-item>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
    receipt: ReceiptModel
}>()
</script>

<style scoped>
.contents {
    height: 8rem;
    display: flex;
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