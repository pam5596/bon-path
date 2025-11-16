<template>
    <v-fab 
        class="content" 
        color="secondary"
        size="x-large"
        icon="mdi-image" 
        @click="emit('preview')"
    />
</template>

<script setup lang="ts">
const emit = defineEmits(['preview'])

</script>

<style scoped>
.content {
    position: fixed;
    z-index: 1000;
    bottom: calc(56px + 1rem);
    right: 1rem;
}
</style>