<template>
    <div v-if="overlayIsOpen" class="wrapper">
        <AtomProgress />
    </div>
</template>

<script setup lang="ts">
const { overlayIsOpen } = useLoading()
</script>

<style scoped>
.wrapper {
    position: fixed;
    top: 0;
    z-index: 3000;
    width: 100vw;
    height: 100vh;
    background: #00000080;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>