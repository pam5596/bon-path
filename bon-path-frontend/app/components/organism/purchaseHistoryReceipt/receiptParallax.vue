<template>
    <v-parallax :src="receiptImage?.url" />
</template>

<script setup lang="ts">
const { receiptImagesFixture } = useFixtures()
const { receiptId } = useIdParams(['receiptId', 'storeId'])

const receiptImage = ref(receiptImagesFixture.find(
    (image) => image.receiptId == receiptId )
)

</script>

<style scoped>

</style>