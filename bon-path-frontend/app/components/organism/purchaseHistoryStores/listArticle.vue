<template>
    <div class="wrapper">
        <MoleculePurchaseHistoryStoresCard 
            v-for="(store, index) in stores" 
            :key="index"
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
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>