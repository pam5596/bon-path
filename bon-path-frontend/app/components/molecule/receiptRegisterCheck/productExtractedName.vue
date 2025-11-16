<template>
    <v-chip
        color="primary"
        variant="flat"
    >
        {{ props.name }}
    </v-chip>
</template>

<script setup lang="ts">
const props = defineProps<{
    name?: string
}>()
</script>

<style scoped>

</style>