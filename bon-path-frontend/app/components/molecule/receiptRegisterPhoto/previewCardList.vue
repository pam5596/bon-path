<template>
    <v-card-text class="contents">
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
.contents {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
}
</style>