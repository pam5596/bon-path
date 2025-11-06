<template>
    <v-parallax :src="receiptImage.getValues.url"/>
</template>

<script setup lang="ts">
const { receiptImagesFixture } = useFixtures()
const { receiptId } = useIdParams(['receiptId'])
const receiptImage = computed(()=>new ReceiptImageModel(
    receiptImagesFixture.find(image => image.receiptId == receiptId)!
))

</script>

<style scoped>

</style>