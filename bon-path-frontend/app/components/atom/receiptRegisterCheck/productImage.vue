<template>
    <v-list-img>
        <v-img :src="props.src"/>
    </v-list-img>
</template>

<script setup lang="ts">
import type { VImg } from 'vuetify/components';

const props = defineProps<{
    src?: VImg['src']
}>()
</script>

<style scoped>

</style>