<template>
    <article>
        <v-dialog v-model="dialog">
            <MoleculeReceiptRegisterPhotoPreviewCard />
        </v-dialog>
    </article>
</template>

<script setup lang="ts">
const dialog = ref(false)
onMounted(()=>dialog.value = true)

</script>

<style scoped>

</style>