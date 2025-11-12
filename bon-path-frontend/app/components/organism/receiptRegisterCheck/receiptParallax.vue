<template>
    <v-parallax :src="props.receiptImage?.getValues.url"/>
</template>

<script setup lang="ts">
const props = defineProps<{
    receiptImage?: ReceiptImageModel
}>()
</script>

<style scoped>

</style>