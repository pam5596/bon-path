<template>
    <v-card class="contents">
        <v-avatar class="avatar">
            <AtomPurchaseHistoryStoresImage 
                :src="props.store.getValues.image"
            />
        </v-avatar>
        <v-card-item class="item">
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
.contents {
    height: 5rem;
    display: flex;
    justify-content: space-between;
}

.avatar {
    height: 100%;
    object-fit: cover;
    border-radius: 0;
    width: 30%;
}

.item {
    width: 70%;
    padding: 0.5rem;
}

</style>