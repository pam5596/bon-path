<template>
    <v-avatar class="content">
        <v-img 
            aspect-ratio="1/1"
            :src="props.src"
            cover
        />
    </v-avatar>
</template>

<script setup lang="ts">
import type { VImg } from 'vuetify/components';

const props = defineProps<{
    src?: VImg['src']
}>()
</script>

<style scoped>
.content {
    border-radius: 0.5rem;
}
</style>