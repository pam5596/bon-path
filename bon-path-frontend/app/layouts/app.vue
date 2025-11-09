<template>
    <div>
        <div>
            <slot name="parallax" />
        </div>
        <main 
            class="container"
            :style="props.pageTitle && 'gap: 1rem;'"
        >
            <AtomTypography class="app-page-title" >
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
.app-page-title {
    font-size: 2rem;
}

.container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    color: white;
}
</style>