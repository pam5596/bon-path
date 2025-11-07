<template>
    <v-card>
        <v-avatar>
            <AtomPurchaseHistoryReceiptsImage 
                :src="props.receipt.images[0]!.getValues.url"
            />
        </v-avatar>
        <v-card-item>
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

</style>