<template>
    <v-card-title>
        {{ localeStringDate }}
    </v-card-title>
</template>

<script setup lang="ts">
const props = defineProps<{
    value: Date
}>()
const localeStringDate = computed(()=>props.value.toLocaleString())

</script>

<style scoped>

</style>