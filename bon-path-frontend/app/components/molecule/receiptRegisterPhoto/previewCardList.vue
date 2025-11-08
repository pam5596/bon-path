<template>
    <v-card-text class="card-text">
        <AtomReceiptRegisterPhotoAvatar 
            v-for="(url, index) in props.imageUrls" 
            :key="index"
            :src="url"
        />
    </v-card-text>
</template>

<script setup lang="ts">
const props = defineProps<{
    imageUrls: string[]
}>()
</script>

<style scoped>
.card-text {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
}
</style>