<template>
    <div>
        <div>
            <slot name="parallax" />
        </div>
        <main 
            class="main-container"
            :style="props.pageTitle && 'gap: 1rem;'"
        >
            <AtomTypography class="text-h4" >
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
}
</style>