<template>
    <v-parallax :src="store.getValues.image" />
</template>

<script setup lang="ts">
const { storesFixture } = useFixtures()
const { storeId } = useIdParams(['storeId'])

const store = computed(()=>new StoreModel(storesFixture.find(
    store => store.id == storeId
)!))

</script>

<style scoped>

</style>