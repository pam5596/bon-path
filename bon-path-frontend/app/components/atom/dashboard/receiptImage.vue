<template>
    <v-img :src="receiptImage?.url" />
</template>

<script setup lang="ts">
const { receiptImagesFixture } = useFixtures()
const receiptImage = ref(receiptImagesFixture[0])

</script>

<style scoped>

</style>