<template>
    <v-card>
        <v-avatar>
            <AtomPurchaseHistoryStoresImage 
                :src="props.store.getValues.image"
            />
        </v-avatar>
        <v-card-item>
            <AtomPurchaseHistoryStoresName>
                {{ props.store.getValues.name }}
            </AtomPurchaseHistoryStoresName>
            <MoleculePurchaseHistoryStoresCardActions />
        </v-card-item>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
    store: StoreModel
}>()
</script>

<style scoped>

</style>