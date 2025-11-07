<template>
    <v-card-title>
        {{ props.value.toLocaleString() }}
    </v-card-title>
</template>

<script setup lang="ts">
const props = defineProps<{
    value: Date
}>()
</script>

<style scoped>

</style>