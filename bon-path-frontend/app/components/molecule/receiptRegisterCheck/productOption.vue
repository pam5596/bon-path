<template>
    <v-list-item no-title>
        <v-avatar class="avatar" size="100">
            <v-img 
                :src="props.src"
            />
        </v-avatar>
        <template #title>
            <span />
        </template>
    </v-list-item>
</template>

<script setup lang="ts">
const props = defineProps<{
    src?: string
}>()
</script>

<style scoped>
.avatar {
    border-radius: 0;
}
</style>