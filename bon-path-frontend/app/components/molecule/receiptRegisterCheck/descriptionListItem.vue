<template>
    <v-list-item>
        <template #prepend>
            <v-icon>
                mdi-alert
            </v-icon>
        </template>
        <v-list-item-title class="title">
            <slot />
        </v-list-item-title>
    </v-list-item>
</template>

<script setup lang="ts">

</script>

<style scoped>
.title {
    white-space: normal;
}
</style>