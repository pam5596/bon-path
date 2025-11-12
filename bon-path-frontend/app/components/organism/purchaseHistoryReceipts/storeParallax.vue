<template>
    <v-parallax :src="props.src" />
</template>

<script setup lang="ts">
const props = defineProps<{
    src?: string
}>()

</script>

<style scoped>

</style>