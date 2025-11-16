<template>
    <v-list-item class="contents">
        <template #prepend>
            <div>
                <v-icon color="primary">
                    mdi-alert
                </v-icon>
            </div>
        </template>
        <v-list-item-title class="title">
            <slot />
        </v-list-item-title>
    </v-list-item>
</template>

<script setup lang="ts">

</script>

<style scoped>
.contents {
    flex-direction: row;
    gap: 0.5rem;
}

.title {
    white-space: normal;
}
</style>