<template>
    <v-overlay v-model="overlayIsOpen">
        <AtomProgress />
    </v-overlay>
</template>

<script setup lang="ts">
const { overlayIsOpen } = useLoading()
</script>

<style scoped>

</style>