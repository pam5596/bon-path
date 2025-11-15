<template>
    <v-parallax 
        class="parallax"
        :src="props.receiptImage?.getValues.url"
        @click="openDialog"
    />
    <MoleculeReceiptRegisterCheckPreviewDialog 
        v-model="modelDialog"
        :src="props.receiptImage?.getValues.url"
    />
</template>

<script setup lang="ts">
const props = defineProps<{
    receiptImage?: ReceiptImageModel
}>()

const modelDialog = ref(false)
const openDialog = () => {modelDialog.value = true}


</script>

<style scoped>
.parallax {
    cursor: pointer;
}
</style>