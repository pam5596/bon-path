<template>
    <div v-if="overlayIsOpen" class="loading-overlay">
        <AtomProgress />
    </div>
</template>

<script setup lang="ts">
const { overlayIsOpen } = useLoading()
</script>

<style scoped>
.loading-overlay {
    position: fixed;
    top: 0;
    z-index: 1005;
    width: 100vw;
    height: 100vh;
    background: #00000080;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>