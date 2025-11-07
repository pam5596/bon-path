<template>
    <v-btn class="content">
        <v-icon>{{ props.mdiIcon }}</v-icon>
        <span>{{ props.name }}</span>
    </v-btn>
</template>

<script setup lang="ts">
import type { VIcon } from 'vuetify/components';

const props =  defineProps<{
    mdiIcon: string,
    name: string
}>()
</script>

<style scoped>
.content {
    padding: 0
}
</style>