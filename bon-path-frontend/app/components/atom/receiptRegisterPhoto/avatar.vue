<template>
    <v-avatar class="avatar" size="200">
        <v-img class="img" :src="props.src"/>
    </v-avatar>
</template>

<script setup lang="ts">
import type { VImg } from 'vuetify/components';

const props = defineProps<{
    src: VImg['src']
}>()
</script>

<style scoped>
.avatar {
    border-radius: 0.5rem;
}

.img {
    object-fit: fill;
}

</style>