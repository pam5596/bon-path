<template>
    <div>
        <div>
            <slot name="parallax" />
        </div>
        <main class="main-container">
            <AtomTypography class="text-h4">
                {{ props.pageTitle }}
            </AtomTypography>
            <div>
                <slot name="main" />
            </div>
        </main>
        <footer>
            <OrganismAppNavigation />
        </footer>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    pageTitle?: string
}>()
</script>

<style scoped>
.main-container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>