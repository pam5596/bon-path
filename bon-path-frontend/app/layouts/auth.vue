<template>
    <div class="container">
        <header>
            <OrganismAuthFirstView />
        </header>
        <main>
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

header {
    display: flex;
    justify-content: center;
}
</style>