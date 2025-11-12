<template>
    <v-dialog v-model="model">
        <MoleculeReceiptRegisterPhotoPreviewCard 
            :image-urls="props.imageUrls"
            @click-save-receipt="emit('click-save-receipt')"
            @click-save-receipt-and-check="emit('click-save-receipt-and-check')"
        />
    </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
    imageUrls: string[]
}>()

const emit = defineEmits(['click-save-receipt', 'click-save-receipt-and-check'])

const model = defineModel({ type: Boolean })

</script>

<style scoped>

</style>