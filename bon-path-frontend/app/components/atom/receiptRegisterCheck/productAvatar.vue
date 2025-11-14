<template>
    <div class="content">
        <v-img 
            class="image"
            aspect-ratio="1/1"
            :src="props.src"
            cover
        />
    </div>
</template>

<script setup lang="ts">
import type { VImg } from 'vuetify/components';

const props = defineProps<{
    src?: VImg['src']
}>()
</script>

<style scoped>
.content {
    width: 20%;
    padding-bottom: 22px;
}

.image {
    border-radius: 0.5rem;
    object-fit: fill;
}
</style>