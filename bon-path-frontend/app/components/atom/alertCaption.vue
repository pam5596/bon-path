<template>
    <AtomTypography class="alert-caption">
        {{ props.content }}
    </AtomTypography>
</template>

<script setup lang="ts">
const props = defineProps<{
    content: ServerError;
}>()

</script>

<style scoped>
.caption {
    font-size: 0.75rem;
    white-space: pre-wrap;
    font-family: courier, monospace;
}
</style>