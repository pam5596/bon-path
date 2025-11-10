<template>
    <v-dialog v-model="dialog">
        <MoleculeReceiptRegisterPhotoPreviewCard 
            :image-urls="props.imageUrls"
        />
    </v-dialog>
</template>

<script setup lang="ts">
const dialog = ref(false)

const props = defineProps<{
    imageUrls: string[]
}>()

</script>

<style scoped>

</style>