<template>
    <v-dialog v-model="dialog">
        <MoleculeReceiptRegisterPhotoPreviewCard 
            :image-urls="imageUrls"
        />
    </v-dialog>
</template>

<script setup lang="ts">
const dialog = ref(false)
// onMounted(()=>dialog.value = true)

const { receiptImagesFixture } = useFixtures()
const imageUrls = computed(() => receiptImagesFixture.map(
    image => image.url
))

</script>

<style scoped>

</style>