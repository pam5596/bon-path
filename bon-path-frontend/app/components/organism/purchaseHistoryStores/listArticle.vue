<template>
    <div v-for="(store, index) in stores" :key="index">
        <MoleculePurchaseHistoryStoresCard 
            :store="store"
        />
    </div>
</template>

<script setup lang="ts">
const { storesFixture } = useFixtures()
const stores = computed(()=>storesFixture.map(
    store => new StoreModel(store))
)

</script>

<style scoped>

</style>