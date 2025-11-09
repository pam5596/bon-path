<template>
    <v-card class="contents" color="blue-darken-4" variant="tonal">
        <AtomTypography class="content">
            {{ props.content }}
        </AtomTypography>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
    content?: ServerError;
}>()

</script>

<style scoped>
.contents {
    width: 100%;
    padding: 0.5rem;
}
.content {
    font-size: 0.5rem;
    white-space: pre-wrap;
    font-family: courier, monospace;
}
</style>