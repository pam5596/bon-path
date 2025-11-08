<template>
    <v-list-item>
        <template #prepend>
            <v-icon>
                mdi-alert
            </v-icon>
        </template>
        <v-list-item-title class="title">
            {{ props.description }}
        </v-list-item-title>
    </v-list-item>
</template>

<script setup lang="ts">
const props = defineProps<{
    description: string;
}>()
</script>

<style scoped>
.title {
    white-space: normal;
}
</style>